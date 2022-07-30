/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { data } from 'src/data';
import { ReportType } from './data';
import { v4 as uuid } from 'uuid';

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
    @Param('type') type: string,
    @Param('id') id: string
  ) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() body: {
      source: string,
      amount: number
    },
    @Param('type') type: string
  ) {
    const newReport = {
      id : uuid(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      update_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    }
    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport(
    @Body() body: {
      source: string,
      amount: number
    },
    @Param('type') type: string,
    @Param('id') id: string 
  ) {
    const typeReport = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const findReport = data.report.filter( report => report.type === typeReport).find( report => report.id === id);
    
    if(!findReport) return;

    const indexReport = data.report.findIndex( report => findReport.id === report.id);
    data.report[indexReport] = {
      ...data.report[indexReport],
      ...body
    }
    return data.report[indexReport];
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('type') type: string,
    @Param('id') id: string
  ) {
    const findIndex = data.report.findIndex( report => id === report.id );
    if(findIndex === -1) return;
    data.report.splice(findIndex, 1);
    return 'Deleted';
  }
}
