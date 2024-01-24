import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: any): Promise<any> {
    if (!file) {
      return { success: false, message: 'No file uploaded' };
    }

    const bufferData = Buffer.from(file.buffer);

    try {
      const createImageDto: CreateImageDto = { data: bufferData };
      const createdImage = await this.imageService.create(createImageDto);
      return { success: true, image: createdImage };
    } catch (error) {
      return { success: false, message: 'Failed to upload image' };
    }
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get('event/:eventId')
  async getImagesByEvent(@Param('eventId') eventId: number) {
      return this.imageService.findByEventId(eventId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
