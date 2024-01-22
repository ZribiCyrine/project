import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminLoginCredentialsDto } from './dto/admin-login-credentials.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get(':email')
  async getParticipantByEmail(@Param('email') email: string) {
    try {
      const participant = await this.adminService.getAdminByEmail(email);
      if (participant) {
        return { success: true, participant };
      } else {
        return { success: false, message: 'Participant not found' };
      }
    } catch (error) {
      return { success: false, message: 'Error retrieving participant' };
    }
  }

  @Post('/login')
  login(@Body() credentials: AdminLoginCredentialsDto) {
    return this.adminService.login(credentials)
  }
}

