import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// createToken for user

console.log(process.env.JWT_SECRET);

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      res.json({
        success: false,
        message: "User doesn't exists please register",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ sucess: false, message: "password invalid" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// register user

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking if the user is already exists in the database
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating the email format

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter the valid email" });
    }

    // validating the strong password

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter the strong password",
      });
    }

    // hashing the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      password: hashedPassword,
      email: email,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
