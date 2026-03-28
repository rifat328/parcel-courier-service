import mongoose from "mongoose";
import User from "../models/user.model.js";
import Parcel from "../models/parcel.model.js";

export const getParcels = async (req, res, next) => {
  try {
    // all parcel , search, active parcel
    // enum: ["Booked", "Picked Up", "In Transit", "Delivered", "Failed"],
    const { role, _id } = req.user;
    const { status, search } = req.query; //get from URL query params;

    let filter = {};
    if (role === "customer") {
      filter.customer = _id;
    } else if (role === "agent") {
      filter.agent = _id;
    } else if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied, you are not authorized to view all parcels",
      });
    }

    //status from query paramiter
    if (status === "active") {
      filter.status = { $nin: ["Delivered", "Failed"] };
    } else if (status) {
      filter.status = status; // like status= Booked
    }

    // Search Logic ( fuzzy search : Tracking ID, Name, Number)
    if (search) {
      const searchRegex = { $regex: search, $options: "i" }; // i would be case insensitive
      filter.$or = [
        { trackingId: searchRegex },
        { deliveryContactName: searchRegex },
        { deliveryContactNumber: searchRegex },
      ];
    }

    // single database call for all:
    const parcels = await Parcel.find(filter)
      .populate("customerd", "-password")
      .populate("agent", "-password")
      .sort({ createdAt: -1 }); // newest first

    // If no parcels found, return 404
    // removed this bec frontend reactquery might see 404 as failed insted of no data
    // if (!parcels || parcels.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No parcels found",
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Parcels fetched successfully",
      count: parcels.length,
      data: parcels,
    });
  } catch (error) {
    next(error);
  }
};
export const getParcel = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const userRole = req.user.role;

    const parcel = await Parcel.findById(req.params.id)
      .populate("customer", "-password")
      .populate("agent", "-password");

    // Check if the user is authorized to view the parcel
    isAdmin = userRole === "admin";
    isCustomer = parcel.customer._id.toString() === userId;
    isAgent = userRole === "agent" && parcel.agent?._id.toString() === userId;

    if (!isAdmin && !isCustomer && !isAgent) {
      return res.status(403).json({
        success: false,
        message: "Access Denied, you are not authorized to view this parcel",
      });
    }

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: "Parcel not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Parcel fetched successfully",
      data: parcel,
    });
  } catch (error) {
    next(error);
  }
};

export const createParcel = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // parcel.customer._id.toString();
    const customerId = req.user._id.toString();
    const userRole = req.user.role;
    console.log(`Customer ID: ${customerId}`);
    const customer = await User.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
    const parcelData = {
      ...req.body,
      customer: customerId,
      pickupAddress: req.body.pickupAddress || customer.address,
    };
    const parcel = await Parcel.create(parcelData);
    await parcel.save({ session });
    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "Parcel created successfully",
      data: parcel,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const updateParcel = async (req, res, next) => {
  // assign [parcel to agent by admin]
  //agent can update status of parcel
  //customer can update -> if parcel is not assigned to agent && customer cant update the status of the parcel

  const userId = req.user._id.toString();
  const userRole = req.user.role;
  const isAdmin = userRole === "admin";
  const isCustomer = userRole === "customer";
  const isAgent = userRole === "agent";

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const parcel = await Parcel.findById(req.params.id)
      .populate("customer", "-password")
      .populate("agent", "-password");
    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: "Parcel not found",
      });
    }
    // validation checks
    if (isCustomer) {
      if (parcel.customer._id.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "You can only update your own parcels",
        });
      }
      // parcel already assigned to agent
      if (parcel.agent) {
        return res.status(403).json({
          success: false,
          message: "Parcel already assigned to an agent. You can't update it.",
        });
      }

      if ("status" in req.body) {
        return res.status(403).json({
          success: false,
          message: "Customers are not allowed to update status.",
        });
      }

      const allowedFields = {
        pickupAddress: req.body.pickupAddress || parcel.pickupAddress,
        deliveryAddress: req.body.deliveryAddress || parcel.deliveryAddress,
        paymentType: req.body.paymentType || parcel.paymentType,
        codAmount: req.body.codAmount || parcel.codAmount,
        parcelType: req.body.parcelType || parcel.parcelType,
      };

      Object.assign(parcel, allowedFields);
      await parcel.save({ session });
      await session.commitTransaction();

      return res.status(200).json({
        success: true,
        message: "Parcel updated successfully by customer",
        data: parcel,
      });
    }

    if (isAdmin) {
      const agentId = req.body.agent;
      if (agentId && agentId !== parcel.agent?._id.toString()) {
        const agent = await User.findById(agentId);
        if (!agent || agent.role !== "agent") {
          return res.status(404).json({
            success: false,
            message: "Agent not found or not authorized",
          });
        }
        parcel.agent = agentId;
      }
      const allowedFields = {
        pickupAddress: req.body.pickupAddress || parcel.pickupAddress,
        deliveryAddress: req.body.deliveryAddress || parcel.deliveryAddress,
        paymentType: req.body.paymentType || parcel.paymentType,
        codAmount: req.body.codAmount || parcel.codAmount,
        parcelType: req.body.parcelType || parcel.parcelType,
        status: req.body.status || parcel.status, // Admin can update status
      };
      Object.assign(parcel, allowedFields);
      await parcel.save({ session });

      await session.commitTransaction();
      return res.status(200).json({
        success: true,
        message: "Parcel updated successfully by admin",
        data: parcel,
      });
    }

    if (isAgent) {
      if (parcel.agent?._id.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "You are not assigned to this parcel",
        });
      }

      if ("status" in req.body) {
        parcel.status = req.body.status;
      }
      if (req.body.location) {
        parcel.location = req.body.location;
      }

      await parcel.save({ session });
      await session.commitTransaction();

      return res.status(200).json({
        success: true,
        message: "Parcel updated successfully by agent",
        data: parcel,
      });
    }

    await session.commitTransaction();
    res.status(200).json({
      success: true,
      message: "Parcel updated successfully",
      data: parcel,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const deleteParcel = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const parcel = await Parcel.findById(req.params.id).session(session);

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: "Parcel not found",
      });
    }

    await parcel.deleteOne({ session });

    await session.commitTransaction();
    res.status(200).json({
      success: true,
      message: "Parcel deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const getHistoryParcels = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id.toString();
    const role = req.user.role;

    let query = {};
    let populateCustomer = false;
    let populateAgent = false;

    // CUSTOMER → can only access their own history
    if (role === "customer") {
      if (userId !== id) {
        return res.status(403).json({
          success: false,
          message: "Customers can only view their own parcel history",
        });
      }
      query = { customer: userId };
      populateAgent = true; // only populate agent data
    }

    // AGENT → can only access history of parcels they delivered
    else if (role === "agent") {
      if (userId !== id) {
        return res.status(403).json({
          success: false,
          message: "Agents can only view their own delivery history",
        });
      }
      query = { agent: userId };
      populateCustomer = true; // only populate customer data
    }

    // ADMIN → can access any user's history
    else if (role === "admin") {
      // Determine if the target user is a customer or an agent
      const targetUser = await User.findById(id).select("role");

      if (!targetUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (targetUser.role === "customer") query = { customer: id };
      else if (targetUser.role === "agent") query = { agent: id };
      else
        return res.status(400).json({
          success: false,
          message: "Admins do not have parcel history",
        }); // If admin ID or some other role, dont want to expose the entire DB
    }

    let parcelQuery = Parcel.find(query).sort({ createdAt: -1 });
    if (populateCustomer) {
      parcelQuery = parcelQuery.populate("customer", "-password");
    }
    if (populateAgent) {
      parcelQuery = parcelQuery.populate("agent", "-password");
    }
    const parcels = await parcelQuery;

    return res.status(200).json({
      success: true,
      message: "Parcel history fetched Successfully",
      data: parcels,
    });
  } catch (error) {
    next(error);
  }
};
