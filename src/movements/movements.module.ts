import { Module } from '@nestjs/common';
import { MovementsController } from './movements.controller';
import { MovementsService } from './movements.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MovementsController],
  providers: [MovementsService, PrismaService],
})
export class MovementsModule {}
