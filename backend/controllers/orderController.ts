import type { Request, Response } from "express";
import orderModel from "../models/orderModel.ts";
import userModel from "../models/userModel.ts";

const placeOrder = async (req: Request, res: Response) => {
    try {
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId, 
            items, 
            amount, 
            address,
            status: "Placed",
            paymentMethod: "COD", 
            payment: false, 
            date: Date.now()
        };
        console.log("Order data:", orderData);
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {cartData: {}});
        res.json({success: true, message: "Order placed successfully"});
    } catch (error) {
        res.json({success: false, message: error instanceof Error ? error.message : "Error placing order"});
    }
}

const placeOrderStripe = async (req: Request, res: Response) => {

}

const placeOrderRazorpay = async (req: Request, res: Response) => {

}

const allOrders = async (req: Request, res: Response) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, orders});
    } catch (error) {
        res.json({success: false, message: error instanceof Error ? error.message : "Unknown error"});
    }
}

const userOrders = async (req: Request, res: Response) => {
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        res.json({success: true, orders});
    } catch (error) {
        res.json({success: false, message: error instanceof Error ? error.message : "Unknown error"});
    }
}

const updateStatus = async (req: Request, res: Response) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success: true, message: "Order status updated successfully"});
    } catch (error) {
        res.json({success: false, message: error instanceof Error ? error.message : "Unknown error"});
    }
}

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};