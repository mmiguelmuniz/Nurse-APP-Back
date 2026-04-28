import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemCategory, MovementType } from '@prisma/client';

type ListParams = {
  page: number;
  pageSize: number;
  categoria?: ItemCategory;
  itemId?: string;
  tipo?: MovementType;
  q?: string;
  start?: string;
  end?: string;
};

@Injectable()
export class MovementsService {
  constructor(private prisma: PrismaService) {}

  async list(params: ListParams) {
    const { page, pageSize, categoria, itemId, tipo, q, start, end } = params;

    const where: any = {};

    if (itemId) where.itemId = itemId;
    if (tipo) where.tipo = tipo;

    if (start || end) {
      where.createdAt = {
        gte: start ? new Date(start) : undefined,
        lte: end ? new Date(end) : undefined,
      };
    }

    // filtros por item relacionado
    if (categoria || q) {
      where.item = {
        ...(categoria ? { categoria } : {}),
        ...(q ? { nome: { contains: q } } : {}),
      };
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const take = Number(pageSize);

    const [total, items] = await this.prisma.$transaction([
      this.prisma.movement.count({ where }),
      this.prisma.movement.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        include: {
          item: true,
          attendance: {
            select: { id: true, nome: true, createdAt: true },
          },
        },
      }),
    ]);

    return { total, page, pageSize, items };
  }
}
