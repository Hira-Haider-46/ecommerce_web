import type { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.ts";

export interface CustomRequest extends Request {
  files?:
    | {
        [fieldname: string]: Express.Multer.File[];
      }
    | Express.Multer.File[];
}

const addProduct = async (req: CustomRequest, res: Response) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    if (!req.files || Array.isArray(req.files)) {
      res.status(400).json({ success: false, message: "No images provided" });
      return;
    }

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        try {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (err) {
          console.error(`Error uploading ${item.originalname}:`, err);
          return null;
        }
      })
    );

    imagesUrl = imagesUrl.filter((url) => url !== null);

    const productData = {
      name, description, category, price: Number(price), subCategory, bestseller:  bestseller === "true" ? true : false, sizes: JSON.parse(sizes), image: imagesUrl, date: Date.now()
    };

    console.log("Product data:", productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });

  } catch (error) {
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

const listProduct = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

const removeProduct = async (req: Request, res: Response) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

const singleProduct = async (req: Request, res: Response) => {
  try {
    const  {productId} = req.body;
    const product = await productModel.findById(productId);
    if (product) res.json({ success: true, product});
    else res.json({ success: false, message: "Product not found" });
  } catch (error) {
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };