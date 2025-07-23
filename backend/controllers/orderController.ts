import type { Request, Response } from "express";
import Stripe from "stripe";
import orderModel from "../models/orderModel.ts";
import userModel from "../models/userModel.ts";

const currency = "usd";
const deliveryCharges = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      status: "Placed",
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Error placing order",
    });
  }
};

const placeOrderStripe = async (req: Request, res: Response) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      address,
      status: "Placed",
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

const verifyStripe = async (req: Request, res: Response) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Order placed successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Order cancelled" });
    }
  } catch (error) {
    res.json({
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

const placeOrderRazorpay = async (req: Request, res: Response) => {};

const allOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const userOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updateStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
};
