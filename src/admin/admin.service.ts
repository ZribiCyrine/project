import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private jwtService: JwtService
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(createAdminDto);
    return await this.adminRepository.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id: id } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    this.adminRepository.update(id, updateAdminDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }



  async login(credentials:LoginCredentialsDto) {
    if (!credentials || !credentials.email || !credentials.password) {
      throw new BadRequestException('Invalid credentials provided.');
    }
  
    //recupere le login et le mdp
    const{email,password}=credentials;
  
    const admin = await this.adminRepository.createQueryBuilder("admin")
      .where("admin.email= :email",
      { email })
      .select(["admin.password","admin.salt","admin.name","admin.firstname","admin.email"])
      .getOne();
  

      console.log("admin",admin);
    if(!admin)
       throw  new NotFoundException( 'email ou password erronée');
    
    const hashedPassword = await bcrypt.hash(password, admin.salt);
    if( hashedPassword == admin.password){
      const payload=  {
        name:admin.name,
        firstname:admin.firstname,
        email:admin.email
        };
      const jwt= this.jwtService.sign(payload);
      return {
        "access_token":jwt
      }
    }
    else{
      throw  new NotFoundException( 'email ou password erronée');
    }
  }
}
