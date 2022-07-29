export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const data = {
  report: [
    {
      id: 'uuid1',
      source: 'Salary',
      amount: 750,
      created_at: new Date(),
      update_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: 'uuid2',
      source: 'YouTube',
      amount: 2500,
      created_at: new Date(),
      update_at: new Date(),
      type: ReportType.EXPENSE,
    },
  ],
};

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    update_at: Date;
    type: ReportType;
  }[];
}
