import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

// express.Router will automatically pass the req , res to the handler function in the route Eg. authMiddleware (req,res,next) # next is passing the route handler , addToCart(req,res)

const cartRouter = express.Router();

//  create multiple endpoint for cartPage;

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.get("/get", authMiddleware, getCart);

export default cartRouter;
