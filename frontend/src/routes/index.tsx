import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DollarSign,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

async function getTotalExpenses() {
  const res = await api.expenses["total-expense"].$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

function Index() {
  const { data, error, isPending } = useQuery({
    queryKey: ["get-total-expenses"],
    queryFn: getTotalExpenses,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>
            Your total expenses for the current period
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <ExpenseSkeleton />
          ) : error ? (
            <ExpenseError error={error} />
          ) : (
            <ExpenseDisplay data={data} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ExpenseSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

function ExpenseError({ error }: { error: Error }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
}

function ExpenseDisplay({ data }: { data: { totalvalue: number } }) {
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(data.totalvalue);

  const isIncreased = data.totalvalue > 1000; // This is a placeholder condition. Replace with actual logic.

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-primary/10 rounded-full">
          <DollarSign className="h-8 w-8 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold">{formattedValue}</p>
          <p className="text-sm text-muted-foreground">Total expenses</p>
        </div>
      </div>
      <div
        className={`flex items-center ${isIncreased ? "text-red-500" : "text-green-500"}`}
      >
        {isIncreased ? (
          <TrendingUp className="h-4 w-4 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 mr-1" />
        )}
        <span className="text-sm font-medium">
          {isIncreased ? "Increased" : "Decreased"}
        </span>
      </div>
    </div>
  );
}
