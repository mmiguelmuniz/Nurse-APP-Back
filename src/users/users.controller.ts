import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { CurrentUser } from '../common/user.decorator';
import { Role } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private users: UsersService) {}

  @Get('me')
  me(@CurrentUser() user: any) {
    return this.users.findMe(user.id);
  }

  @Get()
  list() {
    return this.users.listAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('role') role: Role) {
    return this.users.updateRole(id, role);
  }
}
