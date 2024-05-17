import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import querystring from "node:querystring";
import pug from "pug";
import { addStudent } from "../src/controller/studentController.js";

dotenv.config();
const { APP_LOCALHOST, APP_PORT } = process.env;

const viewPath = path.join(import.meta.dirname, "src", "view");
const dataPath = path.join(import.meta.dirname, "src", "Data");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const all = fs.readFileSync(path.join(dataPath, "users.json"), {
      encoding: "utf8",
    });
    const { student } = JSON.parse(all);

    pug.renderFile(
      path.join(viewPath, "listStudent.pug"),
      { students: student },
      (err, data) => {
        if (err) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          return res.end(err.message);
        }

        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        return res.end(data);
      }
    );
    return;
  }

  // Nouvelle route pour ajouter un étudiant
  if (req.url === "/addStudent" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newStudent = querystring.parse(body);
      const { name, birth } = newStudent;

      if (!name || !birth) {
        res.writeHead(400, {
          "Content-Type": "text/plain",
        });
        return res.end("Name and birth date are required");
      }

      const success = addStudent(name, birth);

      if (success) {
        res.writeHead(301, {
          Location: "/",
        });
        res.end();
      } else {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("An error occurred while adding the student");
      }
    });
    return;
  }

  res.writeHead(404, {
    "Content-Type": "text/html",
  });
  const page404 = fs.readFileSync(path.join(viewPath, "404.html"), {
    encoding: "utf8",
  });
  res.end(page404);
});

server.listen(port, host, () => {
  console.log(`Server listening at http://${APP_LOCALHOST}:${APP_PORT}`);
});
