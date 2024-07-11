import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
const verifyJwtToken = (token:string)=>true;
@Injectable()
export class AuthMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(" ")[1];
        if(token && verifyJwtToken(token)){
            next();
            return;
        }
        throw new UnauthorizedException()
    }
}