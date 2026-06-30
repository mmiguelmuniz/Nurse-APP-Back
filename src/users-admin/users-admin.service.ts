import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UsersAdminService {
  constructor(private prisma: PrismaService) {}

  listAuthorized() {
    return this.prisma.authorizedEmail.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async addAuthorized(email: string, role: Role, name?: string, addedBy?: string) {
    const existing = await this.prisma.authorizedEmail.findUnique({ where: { email } });
    if (existing) throw new ConflictException('Email já está autorizado.');
    return this.prisma.authorizedEmail.create({
      data: { email, role, name, addedBy },
    });
  }

  async removeAuthorized(id: string) {
    const existing = await this.prisma.authorizedEmail.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Email não encontrado.');
    return this.prisma.authorizedEmail.delete({ where: { id } });
  }

  async updateRole(id: string, role: Role) {
    return this.prisma.authorizedEmail.update({ where: { id }, data: { role } });
  }

  listUsers() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, role: true, createdAt: true, pictureUrl: true },
    });
  }

  async addStudent(data: any) {
    // Generate a studentId from email or name
    const studentId = `manual-${Date.now()}`
    return this.prisma.student.create({
      data: {
        studentId,
        name:             data.name,
        gradeLevel:       data.gradeLevel ?? '',
        department:       data.department ?? '',
        contact1Name:     data.contact1Name     || null,
        contact1Email:    data.contact1Email    || null,
        contact1Relation: data.contact1Relation || null,
        contact1Phone:    data.contact1Phone    || null,
        contact2Name:     data.contact2Name     || null,
        contact2Email:    data.contact2Email    || null,
        contact2Relation: data.contact2Relation || null,
        contact2Phone:    data.contact2Phone    || null,
      },
    })
  }

  async addStaff(data: any) {
    // Store staff in AuthorizedEmail with role STAFF but flag as non-login
    const existing = await this.prisma.authorizedEmail.findUnique({ where: { email: data.email } })
    if (existing) throw new ConflictException('Email já cadastrado.')
    return this.prisma.authorizedEmail.create({
      data: {
        email: data.email,
        role: 'STAFF' as any,
        name: data.name,
        addedBy: data.addedBy,
      },
    })
  }
}