import { app } from "./app";

app.listen({
  host: '0.0.0.0',
  port: 2578
}).then(() => {
  console.log(`Server Running: http://localhost:2578`);
})