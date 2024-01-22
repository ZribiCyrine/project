import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from '../entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';


console.log("process.env.SECRET", process.env.SECRET);
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '1d'
      }
    }),
    TypeOrmModule.forFeature([Admin]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
