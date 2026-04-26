export interface IBusinessIdentity{
 businessIdentity:{
    businessName:string;
    businessEmail:string;
    businessPhone:string;
    businessAddress:string;
  }
}
export interface IBusinessRule{
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
    fastDeliveryCharge:number;
  };
  financial: {
    vatPercentage: number;
    minWalletBalance: number;
    isServiceActive: boolean;
  };
  lastUpdatedBy: string; // Admin User ID
}

export interface IBusinessSettings extends IBusinessIdentity, IBusinessRule  {
 
  
}