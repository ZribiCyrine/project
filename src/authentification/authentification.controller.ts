import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { ParticipantSubscribeDto } from './dto/participant-subscribe.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('authentification')
export class AuthentificationController {

  constructor(private readonly authentificationService: AuthentificationService) {}

  @Post('/register')
  register(@Body() participantData: ParticipantSubscribeDto){
    return this.authentificationService.register(participantData)
  }

  @Post('/login')
  login(@Body() credentials: LoginCredentialsDto) {
    return this.authentificationService.login(credentials)
  }

}