import User from "../models/user.model.js";
import mongoose from "mongoose";
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    if (req.user._id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied, you are not authorized to view this user",
      });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (
      req.user.role === "customer" &&
      req.user._id.toString() !== req.params.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access Denied, you are not authorized to update this user",
      });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const isSelf = req.user._id.toString() === req.params.id;
    const isAdmin = req.user.role === "admin";

    if (isSelf) {
      return res.status(400).json({
        success: false,
        message: "Users cannot delete their own accounts",
      });
    }

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access Denied, you are not authorized to delete this user",
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
/// test on http clint app. allos update last to user routes logic on controller
