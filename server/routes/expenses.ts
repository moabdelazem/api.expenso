import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { postExpenseSchema } from "../sharedTypes";
import { db } from "../db/index";

// Create a new Hono instance to handle the expenses route
export const expensesRoute = new Hono();

// Set up the expenses route
expensesRoute
  .get("/", async (c) => {
    // Get the total amount of all expenses
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await db.expenses.findMany();

    return c.json(data);
  })
  .get("/total-expense", async (c) => {
    // Get the total amount of all expenses
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const total = await db.expenses.aggregate({
      _sum: {
        amount: true,
      },
    });

    const totalvalue = total._sum.amount;

    return c.json({ totalvalue });
  })
  .post("/", zValidator("json", postExpenseSchema), async (c) => {
    // Get name, amount from the request body
    const { name, amount } = c.req.valid("json");

    // Create a new expense in the database
    const newExpense = await db.expenses.create({
      data: {
        name,
        amount: parseFloat(amount),
      },
    });

    return c.json(newExpense);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");

    // Delete the expense from the database
    const deletedExpense = await db.expenses.delete({
      where: {
        id: id,
      },
    });

    return c.json({ deletedExpense });
  });
