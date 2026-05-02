import { z } from "zod";

// 1. Define constants to match your Backend Enums
const PARCEL_SIZES = ["small", "medium", "large"] as const;
const SURCHARGES = ["fragile", "normal"] as const;
const PAYMENT_TYPES = ["COD", "Prepaid"] as const;
const STATUSES = ["Booked", "Picked Up", "In Transit", "Delivered", "Failed"] as const;
const ZONES = ["insideDhaka", "suburb", "outsideDhaka"] as const;

// 2. Sub-schemas for nested objects
const locationSchema = z.object({
  lat: z.number().nullable(),
  lng: z.number().nullable(),
});

const feeBreakdownSchema = z.object({
  baseDeliveryFee: z.number().nonnegative(),
  extraWeightFee: z.number().nonnegative(),
  parcelSurcharge: z.number().nonnegative(),
  codCommission: z.number().nonnegative(),
  fastDeliveryCharge: z.number().nonnegative(),
  subtotal: z.number().nonnegative(),
  vat: z.number().nonnegative(),
  codRemittanceAmount: z.number().nonnegative(),
});

// 3. Main Parcel Schema
export const parcelSchema = z.object({
  customer: z.string(), // On frontend, ObjectIds are usually strings
  pickupAddress: z.string().min(5, "Pickup address is too short"),
  deliveryAddress: z.string().min(5, "⚠️ Delivery Address Required ⚠️"),
  
  // Enums
  parcelType: z.enum(PARCEL_SIZES),
  parcelSurcharge: z.enum(SURCHARGES),
  paymentType: z.enum(PAYMENT_TYPES),
  status: z.enum(STATUSES),
  zone: z.enum(ZONES),

  codAmount: z.number().min(0),
  agent: z.string().nullable().optional(),
  location: locationSchema,
  
  deliveryContactName: z.string().min(1, "Contact name required"),
  deliveryContactNumber: z.string().regex(/^(\+88)?01[3-9]\d{8}$/, "Invalid BD Phone Number"),
  
  weightKg: z.number().positive(),
  codCollectionAmount: z.number().default(0),
  codRemittanceAmount: z.number().default(0),
  isFastDelivery: z.boolean().default(false),
  
  trackingId: z.string().optional(),
  deliveryFee: z.number().nonnegative(),
  feeBreakdown: feeBreakdownSchema,
  
  createdAt: z.date().or(z.string().pipe(z.coerce.date())).optional(),
  updatedAt: z.date().or(z.string().pipe(z.coerce.date())).optional(),
});

// 4. Extract the Type to ensure it matches your Backend IParcel
export type ParcelFormData = z.infer<typeof parcelSchema>;