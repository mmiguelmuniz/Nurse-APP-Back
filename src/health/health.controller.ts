import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  ping() {
    return { status: 'ok', at: new Date().toISOString() };
  }
}
