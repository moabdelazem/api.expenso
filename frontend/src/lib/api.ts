import { hc } from "hono/client";
import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";

const client: any = hc<ApiRoutes>("/");

export const api = client.api;

export async function getAllExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
});

export async function createExpense(data: any) {
  const res = await api.expenses.$post({
    json: data,
  });
  if (!res.ok) {
    throw new Error("Failed to create expense");
  }
  return res.json();
}

export const createExpenseQueryOptions = queryOptions({
  queryKey: ["create-expense"],
  queryFn: createExpense,
});
