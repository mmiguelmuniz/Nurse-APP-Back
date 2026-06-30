import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(private svc: StudentsService) {}

  @Get()
  search(@Query('q') q: string) {
    if (!q || q.trim().length < 2) return [];
    return this.svc.search(q.trim());
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.svc.findById(id);
  }
}