import * as dotenv from 'dotenv';
dotenv.config();
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AdminService } from '../admin/admin.service';
import { CreatorService } from '../creator/creator.service';
import { ParticipantService } from '../participant/participant.service';
import { EventService } from '../event/event.service';
import { Admin } from '../entities/admin.entity';
import { Creator } from '../entities/creator.entity';
import { Participant } from '../entities/participant.entity';
import { SellPoint } from '../entities/sellPoint.entity';
import { Ticket } from '../entities/ticket.entity';
import { Event } from '../entities/event.entity';
import { Image } from '../entities/image.entity';
import { Role } from '../enum/role.enum';
import * as falso from '@ngneat/falso';
import { ImageService } from '../image/image.service';

async function bootstrap() {
    Logger.log('Attempting to connect to the database...');
    try {
        const app = await NestFactory.createApplicationContext(AppModule);
        Logger.error(`Connected to the database successfully`);
        const adminService = app.get(AdminService);
        const creatorService = app.get(CreatorService);
        const participantService = app.get(ParticipantService);
        const eventService = app.get(EventService);
        const imageService = app.get(ImageService);


        const admins = [];
        for (let i = 0; i < 20; i++) {
            const admin = new Admin();
            admin.name = falso.randLastName();
            admin.firstname = falso.randFirstName();
            admin.cin = falso.randNumber({ min: 10000000, max: 99999999 });
            admin.phoneNumber = falso.randNumber({ min: 10000000, max: 99999999 });
            admin.email = falso.randEmail();
            admin.password = falso.randPassword();
            admin.role = Role.ADMIN;
            const newAdmin = await adminService.create(admin);
            admins.push(newAdmin);
        }

        const creators = [];
        for (let i = 0; i < 20; i++) {
            const creator = new Creator();
            creator.name = falso.randLastName();
            creator.firstname = falso.randFirstName();
            creator.cin = falso.randNumber({ min: 10000000, max: 99999999 });
            creator.phoneNumber = falso.randNumber({ min: 10000000, max: 99999999 });
            creator.email = falso.randEmail();
            creator.password = falso.randPassword();
            creator.role = Role.CREATOR;
            const newCreator = await creatorService.create(creator);
            creators.push(newCreator);
        }

        const participants = [];
        for (let i = 0; i < 20; i++) {
            const participant = new Participant();
            participant.name = falso.randLastName();
            participant.firstname = falso.randFirstName();
            participant.cin = falso.randNumber({ min: 10000000, max: 99999999 });
            participant.phoneNumber = falso.randNumber({ min: 10000000, max: 99999999 });
            participant.email = falso.randEmail();
            participant.password = falso.randPassword();
            participant.role = Role.PARTICIPANT;
            const newParticipant = await participantService.create(participant);
            participants.push(newParticipant);
        }

        const sellPoints = [];
        for (let i = 0; i < 20; i++) {
            const sellPoint = new SellPoint();
            sellPoint.name = falso.randCompanyName();
            sellPoint.address = falso.randFullAddress();
            sellPoint.phoneNumber = falso.randNumber({ min: 10000000, max: 99999999 });
            sellPoints.push(sellPoint);
        }

        const tickets = [];
        for (let i = 0; i < 20; i++) {
            const ticket = new Ticket();
            ticket.participant = participants[Math.floor(Math.random() * participants.length)];
            tickets.push(ticket);
        }

        const events = [];
        const rules = ['Alcohol allowed', 'Alcohol prohibited', '+18'];
        for (let i = 0; i < 20; i++) {
            const event = new Event();
            event.name = falso.randWord();
            event.type = falso.randMusicGenre();
            event.address = falso.randStreetAddress();
            event.capacity = falso.randNumber({ min: 50, max: 500 });
            event.rules = rules[Math.floor(Math.random() * 3)];
            event.ticketPrice = falso.randNumber({ min: 40, max: 120 });

            const nbSellPoints = Math.floor(Math.random() * sellPoints.length) + 1;
            event.sellPoints = sellPoints.sort(() => 0.5 - Math.random()).slice(0, nbSellPoints);

            event.creator = creators[Math.floor(Math.random() * creators.length)];
            event.admin = admins[Math.floor(Math.random() * admins.length)];
            const newEvent = await eventService.create(event);
            events.push(newEvent);
        }

        const images = [];
        for (let i = 0; i < 20; i++) {
            const image = new Image();
            image.url = falso.randUrl();
            image.event = events[Math.floor(Math.random() * events.length)];
            const newImage = await imageService.create(image);
            images.push(newImage);
        }
        await app.close();
    } catch (error) {
        Logger.error(`Error during database connection or seed operations: ${error.message}`);
    }
}
bootstrap();