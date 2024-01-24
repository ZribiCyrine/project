import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { Role } from '../enum/role.enum';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>
  ) { }

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const participant = this.personRepository.create(createPersonDto);
    return await this.personRepository.save(participant);
  }

  async findAllByRole(role: Role): Promise<Person[]> {
    return this.personRepository.find({ where: { role } });
}

}
