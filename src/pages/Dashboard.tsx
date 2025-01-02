import { useState } from 'react';
import { BarChart3, IndianRupee, TrendingUp, Wallet, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ExpenseForm } from '@/components/expenses/ExpenseForm';
import { ExpenseList } from '@/components/expenses/ExpenseList';
import { generateReport } from '@/utils/reports';
import { Expense } from '@/types';

interface DashboardProps {
  userData: {
    name: string;
    salary: number;
  };
}

export function Dashboard({ userData }: DashboardProps) {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = userData.salary - totalExpenses;

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses([
      ...expenses,
      { ...newExpense, id: crypto.randomUUID() }
    ]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

 // Update the downloadReport function in Dashboard.tsx
const downloadReport = (type: 'monthly' | 'yearly') => {
  const doc = generateReport(expenses, type, userData);
  doc.save(`expense-report-${type}-${new Date().toISOString().split('T')[0]}.pdf`);
};

  return (
    <div className="container py-6 space-y-8 animate-in fade-in-50">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Welcome back, {userData.name}! 👋</h1>
        <p className="text-muted-foreground">Here's your expense overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-primary/10 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <h3 className="font-medium">Monthly Salary</h3>
          </div>
          <p className="text-2xl font-bold">₹{userData.salary.toLocaleString()}</p>
        </div>

        <div className="p-6 bg-green-500/10 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4" />
            <h3 className="font-medium">Remaining Budget</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">₹{remainingBudget.toLocaleString()}</p>
        </div>

        <div className="p-6 bg-red-500/10 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <h3 className="font-medium">Total Expenses</h3>
          </div>
          <p className="text-2xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</p>
        </div>

        <div className="p-6 bg-blue-500/10 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <h3 className="font-medium">Categories</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">{expenses.length}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-6 bg-background rounded-lg border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Expenses</h2>
            <Button onClick={() => setShowExpenseForm(true)}>Add New</Button>
          </div>
          {showExpenseForm ? (
            <ExpenseForm
              onSubmit={handleAddExpense}
              onClose={() => setShowExpenseForm(false)}
            />
          ) : (
            <ExpenseList
              expenses={expenses.slice().reverse().slice(0, 5)}
              onDelete={handleDeleteExpense}
            />
          )}
        </div>

        <div className="p-6 bg-background rounded-lg border space-y-4">
          <h2 className="text-xl font-semibold">Reports</h2>
          <div className="grid gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => downloadReport('monthly')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Monthly Report
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => downloadReport('yearly')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Yearly Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
