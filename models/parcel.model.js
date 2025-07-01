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
      enum: ["small", "medium", "large", "fragile", "other"],
      default: "medium",
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

    trackingId: { type: String, unique: true }, // (Optional for QR/barcode)
  },
  { timestamps: true }
);

parcelSchema.pre("save", async function (next) {
  if (!this.trackingId) {
    this.trackingId = `PARCEL-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;
  }
  if (this.paymentType === "prepaid") {
    this.codAmount = 0; // Ensure COD amount is 0 for prepaid parcels.
  }
  if (!this.pickupAddress && this.customer) {
    const customer = await mongoose.model("User").findById(this.customer);
    this.pickupAddress = customer.address; // Set pickup address to customer's address if not provided
  }
  next();
});

const Parcel = mongoose.model("Parcel", parcelSchema);

export default Parcel;
