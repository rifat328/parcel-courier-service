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
