import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from '../../person/dto/create-person.dto';

export class ParticipantSubscribeDto extends PartialType(CreatePersonDto) {}