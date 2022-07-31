import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';
import { ResponseReportDto } from 'src/dtos/report.dto';

interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}
@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ResponseReportDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ResponseReportDto(report));
  }

  getReportById(type: ReportType, id: string): ResponseReportDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => id === report.id);

    if (!report) return;

    return new ResponseReportDto(report);
  }

  createReport(
    type: ReportType,
    { amount, source }: Report,
  ): ResponseReportDto {
    const newReport = {
      id: uuid(),
      source: source,
      amount: amount,
      created_at: new Date(),
      update_at: new Date(),
      type: type,
    };
    data.report.push(newReport);
    return new ResponseReportDto(newReport);
  }

  updateReport(
    type: ReportType,
    id: string,
    body: UpdateReport,
  ): ResponseReportDto {
    const findReport = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!findReport) return;

    const indexReport = data.report.findIndex(
      (report) => findReport.id === report.id,
    );
    data.report[indexReport] = {
      ...data.report[indexReport],
      ...body,
      update_at: new Date(),
    };
    return new ResponseReportDto(data.report[indexReport]);
  }

  deleteReport(id: string) {
    const findIndex = data.report.findIndex((report) => id === report.id);
    if (findIndex === -1) return;
    return data.report.splice(findIndex, 1);
  }
}
