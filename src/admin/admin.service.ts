import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Person } from '../entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePersonDto } from '../person/dto/create-person.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>
  ) { }

  async create(createAdminDto: CreatePersonDto): Promise<Person> {
    const admin = this.personRepository.create(createAdminDto);
    return await this.personRepository.save(admin);
  }
}
