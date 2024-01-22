import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from '../entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


console.log("process.env.SECRET", process.env.SECRET);
@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtService, ConfigService],
})
export class AdminModule {}
