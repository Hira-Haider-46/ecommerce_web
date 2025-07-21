import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const authUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = typeof req.headers.token === 'string' ? req.headers.token : undefined;
    if (!token) {
        res.json({success: false, message: "Not authorized"});
        return;
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET as string);
        if (typeof token_decode === "object" && "id" in token_decode) {
            req.body.userId = token_decode.id;
        } else {
            throw new Error("Invalid token payload");
        }
        next();
    } catch (error) {
        res.json({success: false, message: error instanceof Error ? error.message : "Invalid token"});
    }
}

export default authUser;