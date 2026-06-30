import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersAdminService } from './users-admin.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { Role } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class UsersAdminController {
  constructor(private svc: UsersAdminService) {}

  @Get('authorized')
  listAuthorized() {
    return this.svc.listAuthorized();
  }

  @Post('authorized')
  addAuthorized(@Body() body: { email: string; role: Role; name?: string }, @Req() req: any) {
    return this.svc.addAuthorized(body.email, body.role ?? Role.STAFF, body.name, req.user?.email);
  }

  @Delete('authorized/:id')
  removeAuthorized(@Param('id') id: string) {
    return this.svc.removeAuthorized(id);
  }

  @Patch('authorized/:id/role')
  updateRole(@Param('id') id: string, @Body() body: { role: Role }) {
    return this.svc.updateRole(id, body.role);
  }

  @Get('users')
  listUsers() {
    return this.svc.listUsers();
  }

  @Post('student')
  addStudent(@Body() body: any) {
    return this.svc.addStudent(body);
  }

  @Post('staff')
  addStaff(@Body() body: any, @Req() req: any) {
    return this.svc.addStaff({ ...body, addedBy: req.user?.email });
  }
}