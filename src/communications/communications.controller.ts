import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { CommunicationsService } from './communications.service';

@Controller('communications')
@UseGuards(JwtAuthGuard)
export class CommunicationsController {
  constructor(private svc: CommunicationsService) {}

  @Get()
  list() {
    return this.svc.list();
  }
}
