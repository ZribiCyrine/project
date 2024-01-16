import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Event } from './entities/event.entity';
import { ConfirmedEvent } from './entities/confirmedEvent.entity';
import { Creator } from './entities/creator.entity';
import { Participant } from './entities/participant.entity';
import { Person } from './entities/person.entity';
import { Date } from './entities/date.entity';
import { Image } from './entities/image.entity';
import { SellPoint } from './entities/sellPoint.entity';
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
      //autoLoadEntities: true,
      entities: [Admin, Creator, Participant, Person, Event, ConfirmedEvent, Date, Image, SellPoint, Ticket],
      synchronize: true,
      options: {
        enableArithAbort: true,
        trustServerCertificate: true 
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
