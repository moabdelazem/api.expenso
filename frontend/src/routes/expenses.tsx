import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, DollarSign } from "lucide-react";

export const Route = createFileRoute("/expenses")({
  component: ExpenseDisplay,
});

interface Expense {
  name: string;
  id: string;
  amount: number;
  createdAt: string;
}

async function getAllExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data: Expense[] = await res.json();
  return data;
}

function ExpenseDisplay() {
  const { data, error, isPending } = useQuery<Expense[]>({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  if (isPending) {
    return <ExpenseSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalExpenses =
    data?.reduce((sum, expense) => sum + expense.amount, 0) || 0;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Expense Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {data?.length} Expenses
          </Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-muted-foreground" />
                    {expense.amount.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1 text-muted-foreground" />
                    {new Date(expense.createdAt).toLocaleDateString()}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ExpenseSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <Skeleton className="h-8 w-64" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-16 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default ExpenseDisplay;
