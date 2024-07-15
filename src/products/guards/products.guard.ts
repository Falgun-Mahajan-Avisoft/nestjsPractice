import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ProductsGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log("Inside the guard");
       const ctx = context.switchToHttp();
       const req = ctx.getRequest()
       console.log(req.headers);
       
        return true;
    }
}