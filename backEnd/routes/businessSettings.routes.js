import { Router } from "express";
import {
  getBusinessSettings,
  updateBusinessSettings,
  getBusinessSettingsHistory,
} from "../controllers/businessSettings.controller";
import { checkRole, authorize } from "../middlewares/auth.middleware";
const businessSettingsRouter = Router();

businessSettingsRouter.get(
  "/getbusinesssettings",
  authorize,
  checkRole(["admin"]),
  getBusinessSettings,
);
businessSettingsRouter.put(
  "/updatebusinesssettings",
  authorize,
  checkRole(["admin"]),
  updateBusinessSettings,
);
businessSettingsRouter.get(
  "/getbusinesssettingshistory",
  authorize,
  checkRole(["admin"]),
  getBusinessSettingsHistory,
);

export default businessSettingsRouter;

/**
 * @swagger
 * tags:
 *   name: BusinessSettings
 *   description: Business settings operations (admin only)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BusinessSettings:
 *       type: object
 *       properties:
 *         businessIdentity:
 *           type: object
 *           required:
 *             - businessName
 *             - businessPhone
 *           properties:
 *             businessName:
 *               type: string
 *               maxLength: 100
 *               example: "SwiftParcel BD"
 *             businessEmail:
 *               type: string
 *               format: email
 *               example: "admin@swiftparcel.com"
 *             businessPhone:
 *               type: string
 *               example: "+8801712345678"
 *             businessAddress:
 *               type: string
 *               maxLength: 200
 *               minLength: 10
 *               example: "123 Mirpur Road, Dhaka 1216"
 *         pricing:
 *           type: object
 *           properties:
 *             insideDhakaFee:
 *               type: number
 *               minimum: 0
 *               default: 60
 *               example: 60
 *             suburbFee:
 *               type: number
 *               minimum: 0
 *               default: 100
 *               example: 100
 *             outsideDhakaFee:
 *               type: number
 *               minimum: 0
 *               default: 150
 *               example: 150
 *         weightRules:
 *           type: object
 *           properties:
 *             baseWeightLimitKG:
 *               type: number
 *               minimum: 0.1
 *               default: 1
 *               example: 1
 *             extraWeightUnitKG:
 *               type: number
 *               minimum: 0.1
 *               default: 1
 *               example: 1
 *               description: Charge applies per this many KG over the base limit
 *             extraWeightCharge:
 *               type: number
 *               minimum: 0
 *               default: 20
 *               example: 20
 *             maxParcelWeightKG:
 *               type: number
 *               minimum: 0.1
 *               default: 10
 *               example: 10
 *         surcharges:
 *           type: object
 *           properties:
 *             fragileSurcharge:
 *               type: number
 *               minimum: 0
 *               default: 50
 *               example: 50
 *             liquidSurcharge:
 *               type: number
 *               minimum: 0
 *               default: 20
 *               example: 20
 *             codCommissionPercentage:
 *               type: number
 *               minimum: 0
 *               maximum: 100
 *               default: 1
 *               example: 1
 *               description: Percentage of COD amount charged as commission
 *             fastDeliveryCharge:
 *               type: number
 *               minimum: 0
 *               default: 0
 *               example: 30
 *         financial:
 *           type: object
 *           properties:
 *             vatPercentage:
 *               type: number
 *               minimum: 0
 *               maximum: 100
 *               default: 0
 *               example: 5
 *             minWalletBalance:
 *               type: number
 *               minimum: 0
 *               default: 0
 *               example: 100
 *             isServiceActive:
 *               type: boolean
 *               default: true
 *               example: true
 *         lastUpdatedBy:
 *           type: string
 *           description: User ID of the admin who last updated the settings
 *           example: "664f1b2e3c4a5d6e7f8a9b0c"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/businesssettings/getbusinesssettings:
 *   get:
 *     summary: Get current business settings (admin)
 *     tags: [BusinessSettings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns current settings, or null if none configured yet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   description: Only present when no settings are found
 *                 data:
 *                   nullable: true
 *                   $ref: '#/components/schemas/BusinessSettings'
 *             examples:
 *               settingsFound:
 *                 summary: Settings exist
 *                 value:
 *                   success: true
 *                   data:
 *                     businessIdentity:
 *                       businessName: "SwiftParcel BD"
 *                       businessEmail: "admin@swiftparcel.com"
 *                       businessPhone: "+8801712345678"
 *                       businessAddress: "123 Mirpur Road, Dhaka 1216"
 *                     pricing:
 *                       insideDhakaFee: 60
 *                       suburbFee: 100
 *                       outsideDhakaFee: 150
 *                     weightRules:
 *                       baseWeightLimitKG: 1
 *                       extraWeightUnitKG: 1
 *                       extraWeightCharge: 20
 *                       maxParcelWeightKG: 10
 *                     surcharges:
 *                       fragileSurcharge: 50
 *                       liquidSurcharge: 20
 *                       codCommissionPercentage: 1
 *                       fastDeliveryCharge: 0
 *                     financial:
 *                       vatPercentage: 0
 *                       minWalletBalance: 0
 *                       isServiceActive: true
 *                     lastUpdatedBy: "664f1b2e3c4a5d6e7f8a9b0c"
 *               noSettingsFound:
 *                 summary: No settings configured yet
 *                 value:
 *                   success: true
 *                   message: "No settings found. Using system defaults."
 *                   data: null
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin only
 */

/**
 * @swagger
 * /api/v1/businesssettings/updatebusinesssettings:
 *   put:
 *     summary: Update business settings (admin) — creates if not exists
 *     tags: [BusinessSettings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessSettings'
 *           example:
 *             businessIdentity:
 *               businessName: "SwiftParcel BD"
 *               businessEmail: "admin@swiftparcel.com"
 *               businessPhone: "+8801712345678"
 *               businessAddress: "123 Mirpur Road, Dhaka 1216"
 *             pricing:
 *               insideDhakaFee: 60
 *               suburbFee: 100
 *               outsideDhakaFee: 150
 *             surcharges:
 *               codCommissionPercentage: 1
 *             financial:
 *               isServiceActive: true
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/BusinessSettings'
 *             example:
 *               success: true
 *               message: "Business settings updated successfully"
 *               data:
 *                 businessIdentity:
 *                   businessName: "SwiftParcel BD"
 *                   businessEmail: "admin@swiftparcel.com"
 *                   businessPhone: "+8801712345678"
 *                   businessAddress: "123 Mirpur Road, Dhaka 1216"
 *                 pricing:
 *                   insideDhakaFee: 60
 *                   suburbFee: 100
 *                   outsideDhakaFee: 150
 *                 weightRules:
 *                   baseWeightLimitKG: 1
 *                   extraWeightUnitKG: 1
 *                   extraWeightCharge: 20
 *                   maxParcelWeightKG: 10
 *                 surcharges:
 *                   fragileSurcharge: 50
 *                   liquidSurcharge: 20
 *                   codCommissionPercentage: 1
 *                   fastDeliveryCharge: 0
 *                 financial:
 *                   vatPercentage: 0
 *                   minWalletBalance: 0
 *                   isServiceActive: true
 *                 lastUpdatedBy: "664f1b2e3c4a5d6e7f8a9b0c"
 *       400:
 *         description: Validation error (e.g. negative fee, invalid email)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin only
 */

/**
 * @swagger
 * /api/v1/businesssettings/getbusinesssettingshistory:
 *   get:
 *     summary: Get business settings change history (admin)
 *     tags: [BusinessSettings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of historical business settings changes
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin only
 */
