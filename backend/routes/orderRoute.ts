import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazor,
} from "../controllers/orderController.ts";
import adminAuth from "../middleware/adminAuth.ts";
import authUser from "../middleware/auth.ts";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.put("/status", adminAuth, updateStatus);

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

orderRouter.post("/userorders", authUser, userOrders);

orderRouter.post('/verifyStripe', authUser, verifyStripe);
orderRouter.post('/verifyRazorpay', authUser, verifyRazor);

export default orderRouter;