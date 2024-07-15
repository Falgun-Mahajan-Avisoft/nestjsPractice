import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory{
    constructor(private readonly configService:ConfigService){}
    createMongooseOptions(): Promise<MongooseModuleOptions> | MongooseModuleOptions {
        const userName = this.configService.get('DATABASE_USER');
        const password = this.configService.get('DATABASE_PASSWORD');
        const host = this.configService.get('DATABASE_HOST');
        const db = this.configService.get('DATABASE_NAME');
        const uri = `mongodb+srv://${userName}:${password}@${host}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
        return { uri };
    }
}