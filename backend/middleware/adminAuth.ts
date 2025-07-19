import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers;
    if (!token) {
      res.json({ success: false, message: "No token provided" });
      return;
    }
    if (typeof token !== "string") {
      res.json({ success: false, message: "Invalid token format" });
      return;
    }

    const token_decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { email?: string; id?: string };

    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      res.json({ success: false, message: "Not authorized" });
      return;
    }

    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    res.json({ success: false, message: "Invalid token" });
    return;
  }
};

export default adminAuth;
