import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { AttendancesModule } from './attendances/attendances.module';
import { MetricsModule } from './metrics/metrics.module';
import { HealthModule } from './health/health.module';
import { ClassesModule } from './classes/classes.module';
import { ReasonsModule } from './reasons/reasons.module';
import { CommunicationsModule } from './communications/communications.module';
import { MovementsModule } from './movements/movements.module';
import { StudentsModule } from './students/students.module';
import { StaffModule } from './staff/staff.module';
import { UsersAdminModule } from './users-admin/users-admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    HealthModule,
    AuthModule,
    UsersModule,
    ItemsModule,
    AttendancesModule,
    MetricsModule,
    ClassesModule,
    ReasonsModule,
    CommunicationsModule,
    MovementsModule,
    StudentsModule,
    StaffModule,
    UsersAdminModule,
  ],
})
export class AppModule {}