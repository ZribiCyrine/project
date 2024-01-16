import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorModule } from './creator/creator.module';
import { ParticipantModule } from './participant/participant.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      options: {
        enableArithAbort: true,
        trustServerCertificate: true, 
        encrypt: true
      }
    }),
    CreatorModule,
    ParticipantModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
