import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Expense } from '@/types';

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
  onClose: () => void;
}

export function ExpenseForm({ onSubmit, onClose }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: Number(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount (₹)</label>
        <input
          type="number"
          required
          className="w-full rounded-md border p-2"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <select
          required
          className="w-full rounded-md border p-2"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <input
          type="text"
          required
          className="w-full rounded-md border p-2"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Date</label>
        <input
          type="date"
          required
          className="w-full rounded-md border p-2"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="flex-1">Add Expense</Button>
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
      </div>
    </form>
  );
}