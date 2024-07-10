import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { writeFile } from "fs/promises";

import { join } from "path";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const resp = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const msg= exception.message;
        const body = {
            statusCode:status,
            timestamp:new Date().toISOString(),
            message:msg,
            path:req.url
        }
        this.writeHttpLog(body)
        resp.status(status).json(body)
    }
    private async writeHttpLog(data:Record<string,any>){
        const Logs_Dir = join(__dirname,`${Date.now()}-log.json`)
        try {
            await writeFile(Logs_Dir,JSON.stringify(data))
        } catch (error) {
            return;
        }
    }
}