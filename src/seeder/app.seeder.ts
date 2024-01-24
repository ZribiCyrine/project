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
import { SellPointService } from '../sell-point/sell-point.service';
import * as bcrypt from 'bcrypt';

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
        const sellPointService = app.get(SellPointService);


        const admins = [];
        const admin1 = new Admin();
        admin1.firstname = "cyrine";
        admin1.name = "zribi";
        admin1.cin = 11223344;
        admin1.phoneNumber = 52712485;
        admin1.email = "cyrinezribi23@gmail.com";
        admin1.salt = await bcrypt.genSalt();
        admin1.password =  await bcrypt.hash("cyrine123", admin1.salt);
        admin1.role = Role.ADMIN;
        const newAdmin1 = await adminService.create(admin1);
        admins.push(newAdmin1);

        const admin2 = new Admin();
        admin2.firstname = "salim";
        admin2.name = "ben omrane";
        admin2.cin = 55667788;
        admin2.phoneNumber = 51181080;
        admin2.email = "salimbenomrane@gmail.com";
        admin2.salt = await bcrypt.genSalt();
        admin2.password =  await bcrypt.hash("salim123", admin2.salt);
        admin2.role = Role.ADMIN;
        const newAdmin2 = await adminService.create(admin2);
        admins.push(newAdmin2);

        const creators = [];
        for (let i = 0; i < 20; i++) {
            const creator = new Creator();
            creator.name = falso.randLastName();
            creator.firstname = falso.randFirstName();
            creator.cin = falso.randNumber({ min: 10000000, max: 99999999 });
            creator.phoneNumber = falso.randNumber({ min: 10000000, max: 99999999 });
            creator.email = falso.randEmail();
            creator.password = falso.randPassword();
            creator.salt = falso.randWord();
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
            participant.salt = falso.randWord();
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
            const newSellPoint = await sellPointService.create(sellPoint);
            sellPoints.push(newSellPoint);
        }

        const images = [];
        for (let i = 0; i < 20; i++) {
            const image = new Image();
            const imageData = Buffer.from(falso.randUrl(), 'base64');
            image.data = imageData;
            const newImage = await imageService.create(image);
            images.push(newImage);
        }

        const events = [];
        const alcoholRules = ['Alcool autorisé', 'Alcool interdit'];
        const ageRules = ['+18', '12 ans et plus', 'Tout public'];
        const dressCode = ['Décontracté', 'Créatif', 'Vintage', 'Cocktail'];

        for (let i = 0; i < 20; i++) {
            const event = new Event();
            event.name = falso.randWord();
            event.type = falso.randMusicGenre();
            event.lineUp = falso.randSinger();
            event.address = falso.randStreetAddress();
            event.capacity = falso.randNumber({ min: 50, max: 500 });
            event.alcoholRules = alcoholRules[Math.floor(Math.random() * 2)];
            event.ageRules = ageRules[Math.floor(Math.random() * 3)];
            event.dressCode = dressCode[Math.floor(Math.random() * 4)];
            event.ticketPrice = falso.randNumber({ min: 40, max: 120 });
            event.eventDate = falso.randSoonDate();
            event.sellPoint = sellPoints[Math.floor(Math.random() * sellPoints.length)];
            event.image = images[i];
            const creator = creators[Math.floor(Math.random() * creators.length)];
            //event.admin = admins[Math.floor(Math.random() * admins.length)];
            try {
                const newEvent = await eventService.create(event, creator);
                events.push(newEvent);
            } catch (error) {
                Logger.error(`Error creating event: ${error.message}`);
            }
        }
        
        await app.close();
    } catch (error) {
        Logger.error(`Error during database connection or seed operations: ${error.message}`);
    }
}
bootstrap();