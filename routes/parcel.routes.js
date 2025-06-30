import { Router } from "express";
import {
  getParcel,
  getParcels,
  updateParcel,
  deleteParcel,
  createParcel,
} from "../controllers/parcel.controller.js";
import { authorize, checkRole } from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.get("/", authorize, checkRole("admin"), getParcels);
userRouter.get("/:id", authorize, getParcel);
userRouter.post("/Create/:id", authorize, createParcel);
userRouter.put(
  "/:id",
  authorize,
  checkRole(["customer", "admin"]),
  updateParcel
);
userRouter.delete("/:id", authorize, checkRole(["admin"]), deleteParcel);

export default userRouter;
