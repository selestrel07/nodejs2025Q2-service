import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaModule } from 'src/db/db.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
