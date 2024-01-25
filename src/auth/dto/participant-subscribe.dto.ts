import { PartialType } from '@nestjs/mapped-types';
import { InfoDto } from '../../dto/info.dto';

export class ParticipantSubscribeDto extends PartialType(InfoDto) {}