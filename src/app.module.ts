import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Creator } from './entities/creator.entity';
import { Participant } from './entities/participant.entity';
import { Event } from './entities/event.entity';
import { ConfirmedEvent } from './entities/confirmedEvent.entity';
import { SellPoint } from './entities/sellPoint.entity';
import { Image } from './entities/image.entity';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities:[Admin, Creator, Participant, Event, ConfirmedEvent, SellPoint, Image, Ticket],
      synchronize: true,
      logging: true,
      options: {
        enableArithAbort: true,
        trustServerCertificate: true, 
        encrypt: true
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
