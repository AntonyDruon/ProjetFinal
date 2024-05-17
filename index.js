import http from "node:http";
import dotenv from "dotenv";
import { handleRoutes } from "./route.js"; // Assurez-vous que le chemin est correct

dotenv.config();
const { APP_LOCALHOST, APP_PORT } = process.env;

const server = http.createServer((req, res) => {
  handleRoutes(req, res); // Utilise les routes définies dans routes.js
});

const port = APP_PORT || 8080;
const host = APP_LOCALHOST || "localhost";

server.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
