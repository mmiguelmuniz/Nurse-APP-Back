import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { ItemCategory, MovementType } from '@prisma/client';

@Controller('items')
@UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(private items: ItemsService) {}

  @Get()
  list(@Query('categoria') categoria?: ItemCategory, @Query('q') busca?: string, @Query('ativos') ativos?: string) {
    return this.items.list({ categoria, busca, ativos: ativos ? ativos === 'true' : undefined });
  }

  @Get('criticos')
  criticos() {
    return this.items.criticos();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.items.get(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.items.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.items.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.items.remove(id);
  }

  @Post(':id/entrada')
  entrada(@Param('id') id: string, @Body('quantidade') quantidade: number, @Body('motivo') motivo?: string) {
    return this.items.movimento(id, MovementType.ENTRADA, Number(quantidade), motivo);
  }

  @Post(':id/saida')
  saida(@Param('id') id: string, @Body('quantidade') quantidade: number, @Body('motivo') motivo?: string, @Body('attendanceId') attendanceId?: string) {
    return this.items.movimento(id, MovementType.SAIDA, Number(quantidade), motivo, attendanceId);
  }
}
