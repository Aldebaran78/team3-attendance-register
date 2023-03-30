const queries = require("../model/queries.js");
const express = require("express");
const router = express.Router();
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");
const { ErrorCodes } = require("vue");

router.post("/", async (req, res) => {
  try {
    const { username, name, surname, email, role, password, category } =
      req.body;
    await connection().then(async (connection) => {
      await connection.query(queries.use);

      //create cryptoPassowrd
      let hashedPassowrd = await bcrypt.hash(password, 12);
      //add user inside Db
      await connection
        .query(queries.createUser, [
          username,
          hashedPassowrd,
          name,
          surname,
          email,
          role,
        ])
        .then(async ([rows]) => {
          if (rows.affectedRows === 0) res.json({ status: 404 }).end();
          else {
            category.forEach(async (element) => {
              await connection
                .query(queries.select_trainer_category, [username, element])
                .then(async ([rows]) => {
                  if (rows.length === 0) {
                    await connection
                      .query(queries.insertInto_category_assignment, [
                        username,
                        element,
                      ])
                      .then(([rows]) => {
                        console.log(rows);
                      });
                  }
                });
            });
            res.json({ status: 201 }).end();
          }
        });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 404 }).end();
  }
});

router.patch("/", async (req, res) => {
  try {
    const { username, name, surname, email, role, password, category } =
      req.body;
    await connection().then(async (connection) => {
      await connection.query(queries.use);

      //create cryptoPassowrd
      //let hashedPassowrd = await bcrypt.hash(password, 12);
      //add user inside Db
      console.log('reqqqqqqqqq',req.body)
      await connection
      .query(queries.edit_account, [req.body.email, req.body.username, req.body.name, req.body.surname, req.body.category])
        .then(async ([rows]) => {
          if (rows.affectedRows === 0) res.json({ status: 404 }).end();
          else {
            category.forEach(async (element) => {
              await connection
                .query(queries.select_trainer_category, [username, element])
                .then(async ([rows]) => {
                  if (rows.length === 0) {
                    await connection
                      .query(queries.insertInto_category_assignment, [
                        username,
                        element, 
                      ])
                      .then(([rows]) => {
                        console.log(rows);
                      });
                  }
                });
            });
            res.json({ status: 201 }).end();
          }
        });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 404 }).end();
  }
});


module.exports = router;
