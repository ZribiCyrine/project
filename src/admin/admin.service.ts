import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminLoginCredentialsDto } from './dto/admin-login-credentials.dto';

@Injectable()
export class AdminService {
  private jwtSecret: string;
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(createAdminDto);
    return await this.adminRepository.save(admin);
  }

  async getAdminByEmail(email: string): Promise<Admin> {
    return await this.adminRepository.findOne({ where: { email: email } });
  }

  async login(credentials: AdminLoginCredentialsDto) {
    if (!credentials || !credentials.email || !credentials.password) {
      throw new BadRequestException('Invalid credentials provided.');
    }
    const { email, password } = credentials;
    const admin = await this.getAdminByEmail(email);
    if (!admin) {
      throw new NotFoundException('Email or password incorrect.');
    }
    const hashedPassword = await bcrypt.hash(password, admin.salt);
    if (admin.password === hashedPassword) {
      const payload = {
        name: admin.name,
        firstname: admin.firstname,
        email: admin.email,
      };
      console.log(process.env.JWT_SECRET);
      const jwt = this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: '1d',
      });
      return {
        "access_token": jwt,
      };
    } else {
      throw new NotFoundException('Email or password incorrect.');
    }
  }
}
