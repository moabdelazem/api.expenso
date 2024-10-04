import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { expensesRoute } from "./routes/expenses";

const app = new Hono();

// Use The Logger Middleware For Logging Requests
app.use(logger());
// Use Pretty JSON Middleware For Pretty JSON Responses
app.use(prettyJSON());

app.get("/", (c) => {
  return c.json({ message: "Ligma Balls!" });
});

app.basePath("/api").route("/expenses", expensesRoute);

export default app;
