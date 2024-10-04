import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { postExpenseSchema } from "../sharedTypes";

export const expensesRoute = new Hono();

// !FOR TESTING PURPOSES ONLY!
// FAKE EXPENSES DATA
interface Expense {
  id: number;
  name: string;
  amount: number;
  created_at: string;
}

const fakeExpenses: Expense[] = [
  {
    id: 1,
    name: "Groceries",
    amount: 100,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Rent",
    amount: 1000,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Utilities",
    amount: 200,
    created_at: new Date().toISOString(),
  },
];

expensesRoute
  .get("/", async (c) => {
    return c.json(fakeExpenses);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");

    const expense = fakeExpenses.find((e) => e.id === parseInt(id));

    if (!expense) {
      c.status(404);

      return c.json({ message: "Expense not found" });
    }

    return c.json({ expense });
  })
  .post("/", zValidator("json", postExpenseSchema), async (c) => {
    const { name, amount } = c.req.valid("json");

    const newExpense: Expense = {
      id: fakeExpenses.length + 1,
      name,
      amount: parseFloat(amount),
      created_at: new Date().toISOString(),
    };

    fakeExpenses.push(newExpense);

    c.status(201);

    return c.json(newExpense);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");

    const index = fakeExpenses.findIndex((e) => e.id === parseInt(id));

    if (index === -1) {
      c.status(404);

      return c.json({ message: "Expense not found" });
    }

    fakeExpenses.splice(index, 1);

    return c.json({ message: "Expense deleted" });
  });
