import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Req } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('attendances')
@UseGuards(JwtAuthGuard)
export class AttendancesController {
  constructor(private svc: AttendancesService) {}

  @Get()
  list(@Query() query: any) {
    return this.svc.list(query);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.svc.get(id);
  }

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.svc.create(body, req.user?.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    console.log('PATCH body:', JSON.stringify(body));
    return this.svc.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}