// types/businessSettings.ts
export interface IBusinessSettings {
  pricing: {
    insideDhakaFee: number;
    suburbFee: number;
    outsideDhakaFee: number;
  };
  weightRules: {
    baseWeightLimitKG: number;
    extraWeightUnitKG: number;
    extraWeightCharge: number;
    maxParcelWeightKG: number;
  };
  surcharges: {
    fragileSurcharge: number;
    liquidSurcharge: number;
    codCommissionPercentage: number;
    fastDeliveryCharge:Number;
  };
  financial: {
    vatPercentage: number;
    minWalletBalance: number;
    isServiceActive: boolean;
  };
  lastUpdatedBy: string; // Admin User ID
}