import { BadRequestException, ForbiddenException, HttpStatus, Injectable, NestMiddleware, Optional } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export function userAgent(req:Request, res:Response, next:NextFunction){
    const ua = req.headers["user-agent"];
    console.log(ua);
    req["ua"]=ua;
    throw new BadRequestException();
   res.json({success:true,ua})
//    next()
}

export class UserAgentOptions{
    accepted?:string[];
}
@Injectable()
export class UserAgentMiddleware implements NestMiddleware{
    constructor(@Optional() private options :UserAgentOptions){
    }
    use(req: Request, res: Response, next: NextFunction) {
        const ua = req.headers["user-agent"];
        if(!this.isUserAgentAcceptable(ua)){
           throw new ForbiddenException("Not Allowed")
        }
        console.log(ua);
        req["ua"]=ua;
        next();
    }
    private isUserAgentAcceptable(userAgent:string){
        // const acceptedUserAgents = ["chrome", "firefox"];
        console.log(this.options)
        const acceptedUserAgents = this.options?.accepted || [];
        console.log(acceptedUserAgents);
        
        if(!acceptedUserAgents.length){
            return true;
        }
        return acceptedUserAgents.some(agent=> userAgent.toLowerCase().includes(agent.toLowerCase()))
    }
        
    
}