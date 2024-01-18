import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Image } from "../entities/image.entity";
import { Repository } from "typeorm";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(createImageDto: CreateImageDto): Promise<Image> {
    const participant = this.imageRepository.create(createImageDto);
    return await this.imageRepository.save(participant);
  }

  async findAll(): Promise<Image[]> {
    return await this.imageRepository.find();
  }

  async findOne(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({ where: { id: id } });
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return image;
  }

  async update(id: number, updateImageDto: UpdateImageDto): Promise<Image> {
    this.imageRepository.update(id, updateImageDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.imageRepository.delete(id);
  }
}
