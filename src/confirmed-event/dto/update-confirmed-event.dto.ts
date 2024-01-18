import { PartialType } from '@nestjs/mapped-types';
import { CreateConfirmedEventDto } from './create-confirmed-event.dto';

export class UpdateConfirmedEventDto extends PartialType(CreateConfirmedEventDto) {}
