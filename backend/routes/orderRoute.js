import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

// create api end point

orderRouter.post("/place", authMiddleware, placeOrder);

export { orderRouter };