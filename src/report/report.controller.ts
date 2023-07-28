/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReportType } from 'src/data';
import { CreateReportDto, UpdateReportDto, ResponseReportDto } from 'src/dtos/report.dto';
import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get()
  getAllReport(
    @Param('type') type: string
  ): ResponseReportDto[] {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string
  ): ResponseReportDto {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getReportById(reportType, id);
  }

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  createReport(
    @Body() {
      source,
      amount
    }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType
  ): ResponseReportDto {
    return this.reportService.createReport(type, {amount, source});
  }

  @Put(':id')
  updateReport(
    @Body() body: UpdateReportDto,
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string 
  ): ResponseReportDto {
    const typeReport = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.updateReport(typeReport, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    this.reportService.deleteReport(id);
  }
}
