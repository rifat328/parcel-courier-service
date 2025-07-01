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
    const { customerId } = req.params;
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
    const parcel = new Parcel(parcelData);
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
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const parcel = await Parcel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      session,
    });
    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: "Parcel not found",
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
    const parcel = await Parcel.findByIdAndDelete(req.params.id, { session });
    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: "Parcel not found",
      });
    }
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
    const isCustomer = req.user._id.toString() === id;
    const isAgent = req.user.role === "agent";

    if (!isCustomer && !isAgent) {
      return res.status(403).json({
        success: false,
        message: "Access Denied, you are not authorized to view this history",
      });
    }

    const query = isCustomer ? { customer: id } : { agent: id };

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
