import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { ReasonsService } from './reasons.service';

@Controller('reasons')
@UseGuards(JwtAuthGuard)
export class ReasonsController {
  constructor(private svc: ReasonsService) {}

  @Get()
  list(@Query('ativos') ativos?: string) {
    return this.svc.list({ ativos: ativos ? ativos === 'true' : undefined });
  }
}
