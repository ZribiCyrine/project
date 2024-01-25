import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ParticipantSubscribeDto } from './dto/participant-subscribe.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signIn')
  async signIn(
    @Body() participantSubscribeDto: ParticipantSubscribeDto
  ) {
    return this.authService.signIn(participantSubscribeDto);
  }
}
