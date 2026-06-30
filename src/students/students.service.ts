import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  search(q: string) {
    return this.prisma.student.findMany({
      where: {
        active: true,
        OR: [
          { name:      { contains: q } },
          { studentId: { contains: q } },
        ],
      },
      select: {
        id: true, studentId: true, name: true,
        gradeLevel: true, department: true,
        contact1Name: true, contact1Email: true,
        contact1Relation: true, contact1Phone: true,
        contact2Name: true, contact2Email: true,
        contact2Relation: true, contact2Phone: true,
      },
      orderBy: { name: 'asc' },
      take: 15,
    });
  }

  findById(id: string) {
    return this.prisma.student.findUnique({ where: { id } });
  }
}