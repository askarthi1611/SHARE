export interface Loan {
  account: string;
  customer: string;
  amount: number;
  emi: number;
  rate: number;
  tenure: number;
  startDate: string;
  endDate: string;
}

export interface Summary {
  totalInterest: number;
  totalPrincipal: number;
  totalPaid: number;
  remainingPrincipal: number;
}

export interface Statement {
  loan: Loan;
  summary: Summary;
  installments: any[];
}