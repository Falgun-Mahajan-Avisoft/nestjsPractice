import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose-config.service';

@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => {
    //     const userName = configService.get('DATABASE_USER');
    //     const password = configService.get('DATABASE_PASSWORD');
    //     const host = configService.get('DATABASE_HOST');
    //     const db = configService.get('DATABASE_NAME');
    //     const uri = `mongodb+srv://${userName}:${password}@${host}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
    //     return { uri };
    //   },
    //   inject: [ConfigService],
    // }),
    MongooseModule.forRootAsync({
      // imports:[ConfigModule],
      useClass: MongooseConfigService,
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
