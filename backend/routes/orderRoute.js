import express from "express";
import authMiddleware from "../middleware/auth.js";

import {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const orderRouter = express.Router();

// create api end point

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", adminAuthMiddleware, listOrders);
orderRouter.post("/status", adminAuthMiddleware, updateStatus);

export { orderRouter };
