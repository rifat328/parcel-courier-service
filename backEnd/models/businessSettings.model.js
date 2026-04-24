import mongoose from "mongoose";

const businessSettingsSchema = new mongoose.Schema(
  {
    pricing: {
      insideDhakaFee: { type: Number, default: 60 },
      suburbFee: { type: Number, default: 100 },
      outsideDhakaFee: { type: Number, default: 150 },
    },
    weightRules: {
      baseWeightLimitKG: { type: Number, default: 1 },
      extraWeightUnitKG: { type: Number, default: 1 }, // charge per 1kg or 0.5kg
      extraWeightCharge: { type: Number, default: 20 },
      maxParcelWeightKG: { type: Number, default: 10 },
    },
    surcharges: {
      fragileSurcharge: { type: Number, default: 50 },
      liquidSurcharge: { type: Number, default: 20 },
      codCommissionPercentage: { type: Number, default: 1 }, // 1% of COD amount
      fastDeliveryCharge: { type: Number, default: 0 },
    },
    financial: {
      vatPercentage: { type: Number, default: 0 }, // Often 0 for small couriers
      minWalletBalance: { type: Number, default: 0 },
      isServiceActive: { type: Boolean, default: true },
    },
    // Useful for auditing who changed the prices
    lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

// Ensuring we only ever have one settings document
const BusinessSettings = mongoose.model(
  "BusinessSettings",
  businessSettingsSchema,
);
export default BusinessSettings;
