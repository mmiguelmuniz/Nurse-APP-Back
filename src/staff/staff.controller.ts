import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('staff')
@UseGuards(JwtAuthGuard)
export class StaffController {
  constructor(private svc: StaffService) {}

  @Get()
  search(@Query('q') q: string) {
    if (!q || q.trim().length < 2) return [];
    return this.svc.search(q.trim());
  }
}
