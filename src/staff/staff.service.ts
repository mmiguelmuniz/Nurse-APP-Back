import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  search(q: string) {
    const words = q.trim().split(/\s+/).filter(Boolean)
    return this.prisma.staff.findMany({
      where: {
        active: true,
        AND: words.map(word => ({ name: { contains: word } })),
      },
      select: {
        id: true, name: true, funcao: true, department: true,
      },
      orderBy: { name: 'asc' },
      take: 15,
    });
  }
}