import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "../models/adminModel.js";
import dotenv from "dotenv";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("SUPERADMIN_EMAIL:", process.env.SUPERADMIN_EMAIL);
console.log("SUPERADMIN_PASSWORD:", process.env.SUPERADMIN_PASSWORD);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createSuperadmin = async () => {
  const email = process.env.SUPERADMIN_EMAIL;
  const password = process.env.SUPERADMIN_PASSWORD;

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    console.log("Superadmin already exists");
  }

  const superadmin = new Admin({
    name: "Superadmin",
    email,
    password: password,
    roles: ["superadmin"],
  });

  await superadmin.save();
  console.log("Superadmin created successfully");
  mongoose.disconnect();
};

createSuperadmin().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
