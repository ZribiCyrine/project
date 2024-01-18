import { Module } from '@nestjs/common';
import { CreatorService } from './creator.service';
import { CreatorController } from './creator.controller';
import { Creator } from '../entities/creator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Creator])],
  controllers: [CreatorController],
  providers: [CreatorService],
})
export class CreatorModule {}
