import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReasonsService {
  constructor(private prisma: PrismaService) {}

  list(params?: { ativos?: boolean }) {
    const ativos = params?.ativos;
    return this.prisma.reason.findMany({
      where: {
        active: ativos === undefined ? undefined : ativos,
      },
      orderBy: { name: 'asc' },
    });
  }
}
