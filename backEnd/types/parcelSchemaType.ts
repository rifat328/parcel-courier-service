import mongoose, { Document, Types } from "mongoose";


// --- Enums / Shared Types ---

export type ParcelStatus = "Booked" | "Picked Up" | "In Transit" | "Delivered" | "Failed";
export type DeliveryZone = "insideDhaka" | "suburb" | "outsideDhaka";
export type ParcelSize = "small" | "medium" | "large";          // parcel.parcelType
export type ParcelSurcharge = "fragile" | "normal";  // parcel.parcelSurcharge
export type PaymentType = "COD" | "Prepaid";                    // parcel.paymentType

// --- Sub-Interfaces ---

export interface IFeeBreakdown {
  baseDeliveryFee: number;
  extraWeightFee: number;
  parcelSurcharge: number;
  codCommission: number;
  fastDeliveryCharge: number;
  subtotal: number;
  vat: number;
  codRemittanceAmount: number;
}

export interface ILocation {
  lat: number | null;
  lng: number | null;
}

// --- Main Interface ---

export interface IParcel {
  customer: Types.ObjectId;
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: ParcelSize;
  parcelSurcharge: ParcelSurcharge;
  paymentType: PaymentType;
  codAmount: number;
  status: ParcelStatus;
  agent: Types.ObjectId | null;
  location?: ILocation;
  deliveryContactName: string;
  deliveryContactNumber: string;
  weightKg: number;
  zone: DeliveryZone;
  codCollectionAmount: number;
  codRemittanceAmount: number;
  isFastDelivery: boolean;
  trackingId?: string;
  deliveryFee: number;
  feeBreakdown: IFeeBreakdown;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * This interface represents the Document returned by Mongoose,
 * including helper methods like .save(), .remove(), etc.
 */
export interface IParcelDocument extends IParcel, Document {}