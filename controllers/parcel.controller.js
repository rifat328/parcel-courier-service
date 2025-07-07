import mongoose from "mongoose";
import User from "../models/user.model.js";
import Parcel from "../models/parcel.model.js";

export const getParcels = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === "admin";
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access Denied, you are not authorized to view all parcels",
      });
    }
    const parcels = await Parcel.find()
      .populate("customer", "-password")
      .populate("agent", "-password");

    // If no parcels found, return 404
    if (!parcels || parcels.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No parcels found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Parcels fetched successfully",
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
    const isCustomer = req.user.role === "customer" && userId === id;
    const isAgent = req.user.role === "agent" && userId === id;
    const isAdmin = req.user.role === "admin";

    if (!isCustomer && !isAgent && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access Denied: You're not allowed to view this history",
      });
    }

    const query = isCustomer ? { customer: id } : isAgent ? { agent: id } : {}; // admin gets all

    const parcels = await Parcel.find(query)
      .populate("customer", "-password")
      .populate("agent", "-password");

    res.status(200).json({
      success: true,
      message: "Parcel history fetched successfully",
      data: parcels,
    });
  } catch (error) {
    next(error);
  }
};
