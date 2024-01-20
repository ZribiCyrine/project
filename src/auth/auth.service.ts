import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Person } from '../entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { bcrypt } from 'bcrypt'; 
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Injectable()
export class AuthService {

  constructor(
    //@InjectRepository(Person)
    //private readonly personRepository: Repository<Person>,
    private readonly jwtService: JwtService,
  ) {}

  /*async register(personData: CreateAuthDto): Promise<Partial<Person>> {
    const person = this.personRepository.create({
      ...personData,
    });
    person.salt = await bcrypt.genSalt();
    person.password = await bcrypt.hash(person.password, person.salt);
    try {
      await this.personRepository.save(person);
    } catch (e) {
      throw new ConflictException('les coordonnées doivent etre uniques');
    }
    delete person.salt;
    delete person.password;
    return person;
  }

  async login(credentials: LoginCredentialsDto): Promise<any> {
    const { email, password } = credentials;
    const person = await this.personRepository.createQueryBuilder('person')
      .where('person.email = :email or person.password = :email', { email })
      .getOne();

    if (!person) {
      throw new NotFoundException('email ou password erronée');
    }

    const hashedPassword = await bcrypt.hash(password, person.salt);
    if (hashedPassword === person.password) {
      const payload = {
        name: person.name,
        firstname: person.firstname,
        email: person.email,
      };
      const jwt = await this.jwtService.sign(payload);
      return {
        access_token: jwt,
      };
    } else {
      throw new NotFoundException('email ou password erronée');
    }
  }*/


//////////////////////////////////////////
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
