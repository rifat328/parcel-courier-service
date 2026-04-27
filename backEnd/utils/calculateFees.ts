import { IBusinessRule } from "../types/businessSettings.js";
import {DeliveryZone, ParcelSize, ParcelSurcharge, PaymentType} from "../types/parcelSchemaType.js"
export interface ICalculateFeesInput {
  zone: DeliveryZone;
  weightKG: number;
  parcelSize: ParcelSize;
  parcelSurcharge: ParcelSurcharge;
  paymentType: PaymentType;
  /**
   * COD — the amount the agent collects from the end buyer at the door.
   * The merchant decides this. It can be:
   *   - just their product price (merchant absorbs delivery cost)
   *   - product price + deliveryFee (merchant passes cost to buyer)
   *   - any amount they choose
   * Your business takes codCommissionPercentage from this amount.
   */
  codCollectionAmount?: number;
  isFastDelivery?: boolean;
}

// ─── Output Types ────────────────────────────────────────────────────────────

export interface IFeeBreakdown {
  baseDeliveryFee: number;
  extraWeightFee: number;
  parcelSurcharge: number;      // fragile or liquid surcharge amount, 0 if normal
  codCommission: number;        // your cut from COD collection
  fastDeliveryCharge: number;
  subtotal: number;
  vat: number;
  totalFee: number;             // what merchant owes YOU (deducted from wallet if Prepaid)
  codRemittanceAmount: number;  // what YOU pay back to merchant after collecting COD
                                // = codCollectionAmount - codCommission
                                // = 0 if Prepaid
}

// ─── Main Function ───────────────────────────────────────────────────────────

/**
 * Calculates the complete delivery fee breakdown based on current business settings.
 *
 * COD money flow:
 *   Agent collects `codCollectionAmount` from end buyer at door.
 *   business keeps `codCommission` (% of codCollectionAmount).
 *   Merchant receives `codRemittanceAmount` = codCollectionAmount - codCommission.
 *   Merchant still owes `totalFee` as delivery charge (separate from COD flow).
 *
 * Surcharge stacking:
 *   parcelSurcharge is a single enum — fragile and liquid are mutually exclusive.
 *   COD commission and fastDelivery stack on top of whichever parcel surcharge applies.
 *   Full stack: baseDeliveryFee + extraWeightFee + parcelSurcharge + codCommission + fastDelivery
 *
 * @param input    - Parcel details matching your Parcel schema fields
 * @param settings - Current BusinessSettings document (.lean() recommended)
 * @returns IFeeBreakdown
 *
 * @throws Error if weightKG exceeds maxParcelWeightKG
 * @throws Error if paymentType is COD but codCollectionAmount is missing or zero
 *
 * @example
 * const breakdown = calculateFees(
 *   {
 *     zone: "outsideDhaka",
 *     weightKG: 3,
 *     parcelSize: "medium",
 *     parcelSurcharge: "fragile",
 *     paymentType: "COD",
 *     codCollectionAmount: 1500,  // merchant wants buyer to pay 1500tk at door
 *     isFastDelivery: true,
 *   },
 *   settings
 * );
 * // breakdown.totalFee        → charge merchant this for delivery
 * // breakdown.codRemittanceAmount → remit this back to merchant after agent collects
 */

const calculateFees = (input: ICalculateFeesInput,settings: IBusinessRule):IFeeBreakdown => {
   

  const {
    zone,
    weightKG,
    parcelSurcharge,
    paymentType,
    codCollectionAmount = 0,
    isFastDelivery = false,
  } = input;

  const { pricing, weightRules, surcharges, financial } = settings;

  // ── Guards ───────────────────────────────────────────────────────────────

  if (weightKG > weightRules.maxParcelWeightKG) {
    throw new Error(
      `Parcel weight ${weightKG} kg exceeds the maximum allowed weight of ${weightRules.maxParcelWeightKG} kg.`,
    );
  }

  if (paymentType === "COD" && codCollectionAmount <= 0) {
    throw new Error(
      "codCollectionAmount must be a positive number when paymentType is 'COD'.",
    );
  }

  // ── 1. Base delivery fee by zone ─────────────────────────────────────────

  const zoneMap: Record<DeliveryZone, number> = {
    insideDhaka:  pricing.insideDhakaFee,
    suburb:       pricing.suburbFee,
    outsideDhaka: pricing.outsideDhakaFee,
  };
  const baseDeliveryFee = zoneMap[zone];

  // ── 2. Extra weight fee ──────────────────────────────────────────────────
  // Weight above base limit, rounded UP to next unit.
  // e.g. base=1kg, unit=1kg, parcel=2.1kg → 2 extra units charged

  const extraWeightKG = Math.max(0, weightKG - weightRules.baseWeightLimitKG);
  const extraWeightUnits = Math.ceil(extraWeightKG / weightRules.extraWeightUnitKG);
  const extraWeightFee = extraWeightUnits * weightRules.extraWeightCharge;

  // ── 3. Parcel surcharge (mutually exclusive — single enum) ───────────────
  // fragile and liquid cannot both apply since parcelSurcharge is one value.
  // Stack: whichever applies + 0 for the other.

  const surchargeMap: Record<ParcelSurcharge, number> = {
    fragile: surcharges.fragileSurcharge,
    liquid:  surcharges.liquidSurcharge,
    normal:  0,
  };
  const parcelSurchargeAmount = surchargeMap[parcelSurcharge];

  // ── 4. COD commission ────────────────────────────────────────────────────
  // Taken from the collection amount, not from the delivery fee.
  // e.g. merchant sets codCollectionAmount=1100, commission=1% → you keep 11tk

  const codCommission =
    paymentType === "COD"
      ? roundToCents((codCollectionAmount * surcharges.codCommissionPercentage) / 100)
      : 0;

  // ── 5. Fast delivery ─────────────────────────────────────────────────────

  const fastDeliveryCharge = isFastDelivery ? surcharges.fastDeliveryCharge : 0;

  // ── 6. Subtotal + VAT ────────────────────────────────────────────────────

  const subtotal = roundToCents(
    baseDeliveryFee +
    extraWeightFee +
    parcelSurchargeAmount +
    codCommission +
    fastDeliveryCharge,
  );
  const vat = roundToCents((subtotal * financial.vatPercentage) / 100);
  const totalFee = roundToCents(subtotal + vat);

  // ── 7. COD remittance ────────────────────────────────────────────────────
  // What you owe back to the merchant after agent collects from end buyer.
  // If Prepaid, merchant gets nothing back through COD flow.

  const codRemittanceAmount =
    paymentType === "COD"
      ? roundToCents(codCollectionAmount - codCommission)
      : 0;

  return {
    baseDeliveryFee,
    extraWeightFee,
    parcelSurcharge: parcelSurchargeAmount,
    codCommission,
    fastDeliveryCharge,
    subtotal,
    vat,
    totalFee,
    codRemittanceAmount,
  };

  
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function roundToCents(value: number): number {
  return Math.round(value * 100) / 100;
}
;
