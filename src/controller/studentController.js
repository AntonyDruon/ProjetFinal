import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const cwd = process.cwd();
const studentFilePath = path.join(cwd, "src", "Data", "users.json");
let students = JSON.parse(
  fs.readFileSync(studentFilePath, { encoding: "utf8" })
);

export const addStudent = (name, birth) => {
  console.log(studentFilePath);
  console.log(cwd);
  console.log(students);
  console.log("on rentre dans la fonction add student");
  try {
    students.push({ name, birth });

    fs.writeFileSync(studentFilePath, JSON.stringify(students, null, 2), {
      encoding: "utf8",
    });

    console.log(`l'étudiant ${name} à été ajouté à la liste des étudiants.`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteStudent = (name) => {
  try {
    console.log("testdeleteStudent");
  } catch (error) {
    console.log(error);
    return false;
  }
};
