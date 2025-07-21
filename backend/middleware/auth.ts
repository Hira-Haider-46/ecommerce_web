import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.json({ success: false, message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const token_decode = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof token_decode === "object" && "id" in token_decode) {
      req.body.userId = token_decode.id;
      next();
    } else {
      throw new Error("Invalid token payload");
    }
    
  } catch (error) {
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Invalid token",
    });
  }
};

export default authUser;