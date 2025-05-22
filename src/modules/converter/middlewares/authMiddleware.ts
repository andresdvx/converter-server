import { Request, Response, NextFunction } from "express";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log("Auth middleware");
    next();
}