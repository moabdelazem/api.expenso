import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { expensesRoute } from "./routes/expenses";

const app = new Hono();

// Use The Logger Middleware For Logging Requests
app.use(logger());

app.get("/", (c) => {
  return c.json({ message: "Ligma Balls!" });
});

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
