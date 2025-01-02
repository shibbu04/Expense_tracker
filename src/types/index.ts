export interface User {
  name: string;
  salary: number;
  currency: string;
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export type Theme = 'light' | 'dark';