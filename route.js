import path from "node:path";
import fs from "node:fs";
import querystring from "node:querystring";
import pug from "pug";
import dayjs from "dayjs";
import
{
  addStudent,
  deleteStudent,
} from "./src/controller/studentController.js";

const viewPath = path.join(process.cwd(), "src", "view");
const dataPath = path.join(process.cwd(), "src", "Data");

const menuItems = [
  { path: '/', title: 'List des étudiants', isActive: true },
  { path: '/addStudent', title: 'Nouvel étudiant', isActive: false },
];

export const handleRoutes = (req, res) =>
{
  if (req.url === "/")
  {
    const all = fs.readFileSync(path.join(dataPath, "users.json"), {
      encoding: "utf8",
    });
    let students = JSON.parse(all);
    students = students.map(student =>
      ({ name: student.name, birth: dayjs(student.birth).format("DD/MM/YYYY") })
    );

    pug.renderFile(
      path.join(viewPath, "listStudent.pug"),
      { students, menuItems },
      (err, data) =>
      {
        if (err)
        {
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end(err.message);
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(data);
      }
    );
    return;
  }

  if (req.url === "/addStudent")
  {
    pug.renderFile(
      path.join(viewPath, "addStudent.pug"),
      { menuItems },
      (err, data) =>
      {
        if (err)
        {
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end(err.message);
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(data);
      }
    );
    return;
  }

  // Nouvelle route pour ajouter un étudiant
  if (req.url === "/addNewStudent" && req.method === "POST")
  {
    let body = "";
    req.on("data", (chunk) =>
    {
      body += chunk.toString();
    });
    req.on("end", () =>
    {
      const newStudent = querystring.parse(body);
      const { name, birth } = newStudent;

      if (!name || !birth)
      {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Name and birth date are required");
      }

      const success = addStudent(name, birth);

      if (success)
      {
        res.writeHead(301, { Location: "/" });
        res.end();
      } else
      {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("An error occurred while adding the student");
      }
    });
    return;
  }

  if (
    req.url.match(/^\/deleteStudent\/([a-zA-Z0-9_]+)$/) &&
    req.method === "GET"
  )
  {
    console.log("on rentre dans le delete student");
    const name = req.url.split("/")[2];

    const success = deleteStudent(name);

    if (success)
    {
      res.writeHead(301, { Location: "/" });
      res.end();
    } else
    {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("An error occurred while deleting the student");
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "text/html" });
  const page404 = fs.readFileSync(path.join(viewPath, "404.html"), {
    encoding: "utf8",
  });
  res.end(page404);
};

//   res.writeHead(404, { "Content-Type": "text/html" });
//   const page404 = fs.readFileSync(path.join(viewPath, "404.html"), {
//     encoding: "utf8",
//   });
//   res.end(page404);
