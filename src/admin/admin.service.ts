import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
    constructor(private readonly configService:ConfigService){
        const url = this.configService.get("ADMIN_DATABASE.URL");
        const dbName = this.configService.get("ADMIN_DATABASE.NAME");
        console.log("\nAdmin Database config\n", url,dbName);
        
    }
}
