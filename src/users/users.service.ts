import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findMe(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  listAll() {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  updateRole(id: string, role: Role) {
    return this.prisma.user.update({ where: { id }, data: { role } });
  }
}
