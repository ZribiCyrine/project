import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
  ) { }

  async create(createImageDto: CreateImageDto): Promise<Image> {
    try {
      const image = this.imageRepository.create(createImageDto);
      return await this.imageRepository.save(image);
    } catch (error) {
      throw new BadRequestException('Unable to create image.');
    }
  }

  async findByEventId(eventId: number): Promise<Image[]> {
    return await this.imageRepository.find({
      where: { event: { id: eventId } },
    });
  }

}
