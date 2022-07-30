import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

interface Report {
  amount: number;
  source: string;
}
@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => id === report.id);
  }

  createReport(type: ReportType, { amount, source }: Report) {
    const newReport = {
      id: uuid(),
      source: source,
      amount: amount,
      created_at: new Date(),
      update_at: new Date(),
      type: type,
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, id: string, body: Report) {
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
    return data.report[indexReport];
  }

  deleteReport(id: string) {
    const findIndex = data.report.findIndex((report) => id === report.id);
    if (findIndex === -1) return;
    return data.report.splice(findIndex, 1);
  }
}
