import { Router } from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authorize, checkRole } from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.get("/", authorize, checkRole("admin"), getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.post("/", authorize, (reg, res) =>
  res.send({
    title:
      "CREATE A User ,Caution :: User creation logic handeled by auth sign up , to handle duplication this fild is empty",
  })
);
userRouter.put("/:id", authorize, checkRole(["customer", "admin"]), updateUser);
userRouter.delete("/:id", authorize, checkRole("admin"), deleteUser);

export default userRouter;
// This file defines the user-related routes for the application.
// It includes routes for getting a user, getting all users, updating a user, and deleting a user.
// The routes are protected by authorization middleware to ensure that only authenticated users can access them.
