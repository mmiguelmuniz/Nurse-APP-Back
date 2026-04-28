import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { MovementsService } from './movements.service';
import { ItemCategory, MovementType } from '@prisma/client';

@Controller('movements')
@UseGuards(JwtAuthGuard)
export class MovementsController {
  constructor(private readonly movements: MovementsService) {}

  @Get()
  list(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('categoria') categoria?: ItemCategory,
    @Query('itemId') itemId?: string,
    @Query('tipo') tipo?: MovementType,
    @Query('q') q?: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    return this.movements.list({
      page: Number(page || 1),
      pageSize: Number(pageSize || 20),
      categoria,
      itemId,
      tipo,
      q,
      start,
      end,
    });
  }
}
