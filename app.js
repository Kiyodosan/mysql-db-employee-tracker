// Imports dependencies.
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const dbManipulation = require('./utils/dbManipulation'); ///

// Uses port 3005 on localhost.
const PORT = process.env.PORT || 3005;

// Uses middleware.
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function init() {
  // Asks user which database to use.
  inquirer
    .prompt (
      {
        type: 'list',
        message: 'Select an option:',
        name: 'userOption',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role'
        ]
      }
    )
    .then((response) => {
      // Connects to MySQL.
      const db = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'password',
          database: 'legitimate_business_db'
        }
      );

      //// USE the database here by interacting with schema.sql
      

      dbManipulation.chooseTable(response.userOption);
      dbManipulation.interactDb(dbManipulation.queryAction);
    })
    .catch((err) => console.error(err));
}

// Default response for any unlisted request.
app.use((req, res) => {
  res.status(404).json('Database not found.');
})

app.listen(PORT, () => 
  console.log(`Listening on ${PORT}`)
);

//// Might not need this if it runs in localhost. Test first.
// Initializes the app.
init();