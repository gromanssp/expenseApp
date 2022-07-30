/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType } from './data';
import { CreateReportDto } from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAllReport(
    @Param('type') type: string
  ) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() {
      source,
      amount
    }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType
  ) {
    return this.appService.createReport(type, {amount, source});
  }

  @Put(':id')
  updateReport(
    @Body() body: {
      source: string,
      amount: number
    },
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string 
  ) {
    const typeReport = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    this.appService.updateReport(typeReport, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    this.appService.deleteReport(id);
  }
}
