import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { Person } from '../entities/person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person])
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
