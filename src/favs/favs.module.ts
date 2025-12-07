import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { PrismaModule } from 'src/db/db.module';
import { FavsService } from './favs.service';

@Module({
  imports: [PrismaModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
