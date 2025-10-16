import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('metrics')
@UseGuards(JwtAuthGuard)
export class MetricsController {
  constructor(private svc: MetricsService) {}

  @Get('kpis')
  kpis(@Query('period') period: 'hoje'|'semana'|'mes' = 'hoje') {
    return this.svc.kpis(period);
  }

  @Get('series/daily')
  daily(@Query('days') days = '14') {
    return this.svc.seriesDaily(Number(days));
  }

  @Get('series/weekly')
  weekly(@Query('weeks') weeks = '8') {
    return this.svc.seriesWeekly(Number(weeks));
  }

  @Get('reasons/top')
  top(@Query('limit') limit = '6', @Query('period') period: 'semana'|'mes' = 'semana') {
    return this.svc.topReasons(Number(limit), period);
  }
}
