import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ConfigModule } from '@nestjs/config';
import { ADMIN_DATABASE_CONFIG } from './database.config';

@Module({
  imports:[ConfigModule.forFeature(ADMIN_DATABASE_CONFIG)],
  providers: [AdminService]
})
export class AdminModule {}
