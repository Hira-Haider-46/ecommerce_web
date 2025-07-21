import type { Request, Response } from "express";
import userModel from "../models/userModel.ts";

const addToCart = async (req: Request, res: Response) => {
    try {
        const {userId, id, size} = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            res.json({success: false, message: "User not found"});
            return;
        }
        let cartData = userData.cartData || {};
        if(cartData[id]) {
            if(cartData[id][size]) cartData[id][size] += 1;
            else cartData[id][size] = 1;
        } else {
            cartData[id] = {};
            cartData[id][size] = 1;
        }
        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success: true, message: "Item added to cart"});
    } catch (error) {
        res.json({success: false, message: error instanceof Error ? error.message : "An error occurred"});
    }
}

const updateCart = async (req: Request, res: Response) => {
    try {
        const {userId, id, size, quantity} = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            res.json({success: false, message: "User not found"});
            return;
        }
        let cartData = userData.cartData || {};
        if (cartData[id] && cartData[id][size] !== undefined) {
            cartData[id][size] = quantity;
            if (quantity <= 0) {
                delete cartData[id][size];
                if (Object.keys(cartData[id]).length === 0) {
                    delete cartData[id];
                }
            }
        }
        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success: true, message: "Cart updated successfully"});
    } catch (error) {
        res.json({success: false, message: error instanceof Error ? error.message : "An error occurred"});
    }
}

const getUserCart = async (req: Request, res: Response) => {
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            res.json({success: false, message: "User not found"});
            return;
        }
        const cartData = userData.cartData || {};
        res.json({success: true, cartData});
    } catch (error) {
        res.json({success: false, message: error instanceof Error ? error.message : "An error occurred"});
    }
}

export { addToCart, updateCart, getUserCart };