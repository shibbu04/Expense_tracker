import { Expense } from '@/types';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-4 bg-background rounded-lg border hover:shadow-md transition-shadow"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{expense.category}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(expense.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{expense.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold">₹{expense.amount.toLocaleString()}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(expense.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}