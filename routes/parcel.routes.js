import { Router } from "express";
import {
  getParcel,
  getParcels,
  updateParcel,
  deleteParcel,
  createParcel,
  getHistoryParcels,
} from "../controllers/parcel.controller.js";
import { authorize, checkRole } from "../middlewares/auth.middleware.js";
const parcelRouter = Router();

parcelRouter.get("/", authorize, checkRole("admin"), getParcels);
parcelRouter.get("/:id", authorize, getParcel);
//their own id for their own history except admin
parcelRouter.get(
  "/history/user/:id",
  authorize,
  checkRole(["customer", "agent", "admin"]),
  getHistoryParcels
);
parcelRouter.post(
  "/create",
  authorize,
  checkRole(["customer", "admin"]),
  createParcel
);
parcelRouter.put(
  "/:id",
  authorize,
  checkRole(["customer", "admin", "agent"]),
  updateParcel
);
parcelRouter.delete("/:id", authorize, checkRole(["admin"]), deleteParcel);

export default parcelRouter;

/**
 * @swagger
 * tags:
 *   name: Parcels
 *   description: Parcel operations
 */

/**
 * @swagger
 * /api/v1/parcels:
 *   get:
 *     summary: Get all parcels (admin)
 *     tags: [Parcels]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of parcels
 */

/**
 * @swagger
 * /api/v1/parcels/{id}:
 *   get:
 *     summary: Get parcel by ID
 *     tags: [Parcels]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Parcel details
 */

/**
 * @swagger
 * /api/v1/parcels/create:
 *   post:
 *     summary: Create parcel (customer)
 *     tags: [Parcels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pickupAddress: { type: string }
 *               deliveryAddress: { type: string }
 *               parcelType: { type: string }
 *               paymentType: { type: string }
 *               codAmount: { type: number }
 *               location:
 *                 type: object
 *                 properties:
 *                   lat: { type: number }
 *                   lng: { type: number }
 *     responses:
 *       201:
 *         description: Parcel created
 */

/**
 * @swagger
 * /api/v1/parcels/{id}:
 *   put:
 *     summary: Update parcel
 *     tags: [Parcels]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Parcel updated
 */

/**
 * @swagger
 * /api/v1/parcels/{id}:
 *   delete:
 *     summary: Delete parcel (admin)
 *     tags: [Parcels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Parcel deleted
 */

/**
 * @swagger
 * /api/v1/parcels/history/user/{id}:
 *   get:
 *     summary: Get parcel history for a user
 *     tags: [Parcels]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: List of delivered or booked parcels
 */
