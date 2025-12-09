import { Controller, Get, Post, HttpCode, Param, Delete, HttpStatus } from '@nestjs/common';
import { FavsDto } from './dto/favs.dto';
import { validateId } from 'src/utils/validateId';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll(): Promise<FavsDto> {
    return await this.favsService.findAll();
  }

  @Post(':type(artist|album|track)/:id')
  async addToFavorites(
    @Param('id') id: string,
    @Param('type') type: string,
  ): Promise<void> {
    validateId(id);
    await this.favsService.createFavorite(type, id);
  }

  @Delete(':type(artist|album|track)/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFromFavorites(
    @Param('id') id: string,
    @Param('type') type: string,
  ): Promise<void> {
    validateId(id);
    await this.favsService.removeFavorite(type, id);
  }
}
