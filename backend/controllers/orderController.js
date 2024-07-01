import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// get the secret key from the env file
const stripeKey = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripeKey);

// Placing user order from the frontend
const placeOrder = async (req, res) => {
  const frontendUrl = "http://localhost:5174";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    // clear the cartData after Order has been saved
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // create line_items to store neccessary data from the request data for stripe payment
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "THB",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 36.73 * 100), // convert to THB and multiply by 100 to keep in satang format
      },
      quantity: item.quantity,
    }));

    // push the delivery charge into the line_items

    line_items.push({
      price_data: {
        currency: "THB",
        product_data: { name: "Delivery Charges" },
        unit_amount: Math.round(2 * 36.73 * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ sucess: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// user orders for frontend

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}); // this will get all the data in the table
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updating the order status

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });

    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
