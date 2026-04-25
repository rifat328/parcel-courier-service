import mongoose from "mongoose";

const businessSettingsSchema = new mongoose.Schema(
  {
    businessIdentity: {
      businessName: {
        type: String,
        required: [true, "Business name is required"],
        trim: true,
        maxLength: [100, "Business name cannot exceed 100 characters"],
      },
      businessEmail: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
          validator: function (v) {
            // Returns true if empty (optional) or matches email pattern
            return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: "Please provide a valid email address",
        },
      },
      businessPhone: {
        type: String,
        required: [true, "Business phone number is required"],
        trim: true,
        validate: {
          validator: function (v) {
            return /^\+?[\d\s\-()]{7,20}$/.test(v);
          },
          message: "Please provide a valid phone number",
        },
      },
      businessAddress: {
        type: String,
        trim: true,
        maxLength: [200, "Address cannot exceed 200 characters"],
        validate: {
          validator: function (v) {
            return !v || v.length >= 10;
          },
          message: "Address must be at least 10 characters long",
        },
      },
    },

    pricing: {
      insideDhakaFee: {
        type: Number,
        default: 60,
        min: [0, "Fee cannot be negative"],
      },
      suburbFee: {
        type: Number,
        default: 100,
        min: [0, "Fee cannot be negative"],
      },
      outsideDhakaFee: {
        type: Number,
        default: 150,
        min: [0, "Fee cannot be negative"],
      },
    },

    weightRules: {
      baseWeightLimitKG: {
        type: Number,
        default: 1,
        min: [0.1, "Base weight limit must be at least 0.1 kg"],
      },
      extraWeightUnitKG: {
        type: Number,
        default: 1,
        min: [0.1, "Extra weight unit must be at least 0.1 kg"],
      },
      extraWeightCharge: {
        type: Number,
        default: 20,
        min: [0, "Charge cannot be negative"],
      },
      maxParcelWeightKG: {
        type: Number,
        default: 10,
        min: [0.1, "Max parcel weight must be at least 0.1 kg"],
      },
    },

    surcharges: {
      fragileSurcharge: {
        type: Number,
        default: 50,
        min: [0, "Surcharge cannot be negative"],
      },
      liquidSurcharge: {
        type: Number,
        default: 20,
        min: [0, "Surcharge cannot be negative"],
      },
      codCommissionPercentage: {
        type: Number,
        default: 1,
        min: [0, "Commission cannot be negative"],
        max: [100, "Commission cannot exceed 100%"],
      },
      fastDeliveryCharge: {
        type: Number,
        default: 20,
        min: [0, "Charge cannot be negative"],
      },
    },

    financial: {
      vatPercentage: {
        type: Number,
        default: 0,
        min: [0, "VAT cannot be negative"],
        max: [100, "VAT cannot exceed 100%"],
      },
      minWalletBalance: {
        type: Number,
        default: 0,
        min: [0, "Minimum wallet balance cannot be negative"],
      },
      isServiceActive: {
        type: Boolean,
        default: true,
      },
    },

    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    singleton: {
      type: Boolean,
      default: true,
      immutable: true, // can't be changed after creation
    },
  },
  { timestamps: true },
);

// Enforce singleton: only one settings document can ever exist
businessSettingsSchema.index({ singleton: true }, { unique: true });

const BusinessSettings = mongoose.model(
  "BusinessSettings",
  businessSettingsSchema,
);

export default BusinessSettings;
