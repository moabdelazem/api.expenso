import app from "./app";

// Serve The App On Port 3000
Bun.serve({
  port: process.env.PORT || 3000,
  fetch: app.fetch,
});

console.log(`Server Running On Port ${process.env.PORT || 3000}`);
