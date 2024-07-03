import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const foodRouter = express.Router();

//  Image Storage Engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// created different api end point for handling different request from the frontend
// express.Router.requestAction('path' , function that will be perform when the api endpoint trigger)

foodRouter.post("/add", upload.single("image"), adminAuthMiddleware, addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", adminAuthMiddleware, removeFood);

export default foodRouter;
