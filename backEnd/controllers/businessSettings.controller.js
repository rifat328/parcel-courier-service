import mongoose from "mongoose";
import BusinessSettings from "../models/businessSettings.model";
import User from "../models/user.model";

export const getBusinessSettings = async (req, res, next) => {
  try {
    // .lean() makes the query faster by returning a plain JS object
    let settings = await BusinessSettings.findOne().lean();

    if (!settings) {
      // If nothing exists yet, return a successful response with null
      // or trigger an empty object so the frontend can show defaults.
      return res.status(200).json({
        success: true,
        message: "No settings found. Using system defaults.",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBusinessSettings = async (req, res, next) => {
  try {
    const updateData = {
      ...req.body,
      lastUpdatedBy: req.user._id, // Track who made the change
    };

    // use findOneAndUpdate with an empty filter {} to target the singleton
    const settings = await BusinessSettings.findOneAndUpdate({}, updateData, {
      new: true, // Return the updated document
      upsert: true, // Create it if it doesn't exist
      runValidators: true, // Ensure the new data matches the schema
    });

    res.status(200).json({
      success: true,
      message: "Business settings updated successfully",
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

export const getBusinessSettingsHistory = async (req, res, next) => {};
