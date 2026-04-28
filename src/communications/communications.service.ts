import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommunicationsService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.communication.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
