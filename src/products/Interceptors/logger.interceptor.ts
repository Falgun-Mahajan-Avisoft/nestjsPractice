import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor{
 intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>()
    const res = ctx.getResponse<Response>();
    const startTime = Date.now()
     return next.handle().pipe(tap(()=>{
   const endTime = Date.now();
   const resTime = endTime-startTime;
   console.log(`${req.method} ${req.path} ${res.statusCode} ${resTime}ms`);
   
     }))
 }
}