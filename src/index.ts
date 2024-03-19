import express from "express";
import { pool } from "./db.js";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const data = await pool.query(`select * from schools`);
    res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/", async (req, res) => {
  const { name, location } = req.body;
  try {
    await pool.query(`insert into schools(name,address) values ($1,$2)`, [
      name,
      location,
    ]);
    res.status(200).send({ message: "successfully added the info " });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      "create table schools(id bigserial primary key,name varchar(100) , address varchar(100) )"
    );
    res.status(200).send({ message: "initial setup done" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});
