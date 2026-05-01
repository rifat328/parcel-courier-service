import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema(
  {
    //(pickup address, delivery address, parcel size/type, COD or prepaid
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },

    parcelType: {
      type: String,
      enum: ["small", "medium", "large"],
      default: "medium",
    },
    parcelSurcharge: {
      type: String,
      enum: ["fragile", "normal"],
      default: "normal",
    },

    paymentType: {
      type: String,
      enum: ["COD", "Prepaid"],
      required: true,
    },

    codAmount: {
      // Only used if paymentType is COD
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          if (this.paymentType === "COD") {
            return value > 0; // COD amount must be greater than 0
          }
          return true; // If paymentType is not COD, no validation needed
        },
      },
    },

    status: {
      type: String,
      enum: ["Booked", "Picked Up", "In Transit", "Delivered", "Failed"],
      default: "Booked",
    },

    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },

    deliveryContactName: {
      type: String,
      required: true,
    },
    deliveryContactNumber: {
      type: String,
      required: true,
    },
    weightKg: {
      type: Number,
      required: true,
      min: [0.1, "Weight must be at least 0.1 kg"],
    },
    zone: {
      type: String,
      enum: ["insideDhaka", "suburb", "outsideDhaka"],
      required: true,
    },
    codCollectionAmount: {
      // What agent collects from end buyer at door
      // Merchant sets this: can be product price + delivery fee or just product price
      type: Number,
      default: 0,
    },
    codRemittanceAmount: {
      // What merchant(Customer role) receives back after courier takes commission
      // Computed: codCollectionAmount - codCommission - totalFee
      type: Number,
      default: 0,
    },
    isFastDelivery: {
      type: Boolean,
      default: false,
    },
    trackingId: { type: String, unique: true }, // (Optional for QR/barcode)

    deliveryFee: {
      type: Number,
      required: true,
    },
    feeBreakdown: {
      // Store itemised breakdown for receipts/disputes
      baseDeliveryFee: { type: Number, default: 0 },
      extraWeightFee: { type: Number, default: 0 },
      parcelSurcharge: { type: Number, default: 0 },
      codCommission: { type: Number, default: 0 },
      fastDeliveryCharge: { type: Number, default: 0 },
      subtotal: { type: Number, default: 0 },
      vat: { type: Number, default: 0 },
      codRemittanceAmount: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

parcelSchema.pre("save", async function (next) {
  if (!this.trackingId) {
    this.trackingId = `PARCEL-${Date.now()}-${Math.floor(
      Math.random() * 1000,
    )}`;
  }

  next();
});

const Parcel = mongoose.model("Parcel", parcelSchema);

export default Parcel;
