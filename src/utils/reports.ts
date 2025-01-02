import { jsPDF } from 'jspdf';
import { Expense } from '@/types';

export function generateReport(
  expenses: Expense[],
  type: 'monthly' | 'yearly',
  userData: { name: string; salary: number }
) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    if (type === 'monthly') {
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    }
    return expenseDate.getFullYear() === currentYear;
  });

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = userData.salary - totalAmount;
  
  const categoryTotals = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const reportDate = type === 'monthly' 
    ? today.toLocaleString('default', { month: 'long', year: 'numeric' })
    : currentYear.toString();

  // Create PDF
  const doc = new jsPDF();
  let yPos = 20;
  const leftMargin = 20;
  const lineHeight = 10;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Expense Report', leftMargin, yPos);
  yPos += lineHeight * 2;

  // User Info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${userData.name}`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`Period: ${reportDate}`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`Generated on: ${today.toLocaleDateString()}`, leftMargin, yPos);
  yPos += lineHeight * 2;

  // Financial Summary
  doc.setFont('helvetica', 'bold');
  doc.text('Financial Summary', leftMargin, yPos);
  yPos += lineHeight;
  doc.setFont('helvetica', 'normal');
  doc.text(`Monthly Salary: ₹${userData.salary.toLocaleString()}`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`Total Expenses: ₹${totalAmount.toLocaleString()}`, leftMargin, yPos);
  yPos += lineHeight;
  doc.text(`Remaining Budget: ₹${remainingBudget.toLocaleString()}`, leftMargin, yPos);
  yPos += lineHeight * 2;

  // Category Breakdown
  doc.setFont('helvetica', 'bold');
  doc.text('Category Breakdown', leftMargin, yPos);
  yPos += lineHeight;
  doc.setFont('helvetica', 'normal');
  Object.entries(categoryTotals).forEach(([category, amount]) => {
    doc.text(`${category}: ₹${amount.toLocaleString()}`, leftMargin, yPos);
    yPos += lineHeight;
  });
  yPos += lineHeight;

  // Detailed Expenses
  doc.setFont('helvetica', 'bold');
  doc.text('Detailed Expenses', leftMargin, yPos);
  yPos += lineHeight;
  doc.setFont('helvetica', 'normal');

  // Table headers
  doc.text('Date', leftMargin, yPos);
  doc.text('Category', leftMargin + 30, yPos);
  doc.text('Description', leftMargin + 70, yPos);
  doc.text('Amount', leftMargin + 130, yPos);
  yPos += lineHeight;

  // Draw a line under headers
  doc.line(leftMargin, yPos - 5, leftMargin + 170, yPos - 5);

  // Table content
  filteredExpenses.forEach(expense => {
    if (yPos > 270) { // Check if we need a new page
      doc.addPage();
      yPos = 20;
    }
    
    const date = new Date(expense.date).toLocaleDateString();
    doc.text(date, leftMargin, yPos);
    doc.text(expense.category, leftMargin + 30, yPos);
    doc.text(expense.description.substring(0, 30), leftMargin + 70, yPos);
    doc.text(`₹${expense.amount.toLocaleString()}`, leftMargin + 130, yPos);
    yPos += lineHeight;
  });

  // Footer
  doc.setFontSize(10);
  doc.text('Developed by Shivam ❣️', leftMargin, 290);

  return doc;
}