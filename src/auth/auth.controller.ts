import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantSubscribeDto } from './dto/participant-subscribe.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() participantData: ParticipantSubscribeDto){
    return this.authService.register(participantData)
  }

  @Post('login')
  login(@Body() credentials: LoginCredentialsDto) {
    return this.authService.login(credentials)
  }

}