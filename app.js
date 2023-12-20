// Imports dependencies.
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');
const dbManipulation = require('./utils/dbManipulation');

// Uses port 3005 on localhost.
const PORT = process.env.PORT || 3005;

// Uses middleware.
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function init() {
  inquirer
    .prompt ([
      {
        name: 'userOption',
        type: 'list',
        message: 'Select an option:',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role'
        ]
      },
      {
        name: 'newDepartment',
        type: 'input',
        message: 'Provide a name for the new department.',
        //// Might need to use answers['userOption'] if this doesn't work
        when: (answers) => answers.userOption === 'Add a department'
      },
      {
        name: 'newRole',
        type: 'input',
        message: 'Provide a title for the new role.',
        when: (answers) => answers.userOption === 'Add a role'
      },
      {
        name: 'newRolePt2',
        type: 'input',
        message: 'Provide a salary for the new role.',
        when: (answers) => answers.userOption === 'Add a role'
      },
      {
        name: 'newEmployee',
        type: 'input',
        message: 'Provide a first name for the new employee.',
        when: (answers) => answers.userOption === 'Add an employee'
      },
      {
        name: 'newEmployeePt2',
        type: 'input',
        message: 'Provide a last name for the new employee.',
        when: (answers) => answers.userOption === 'Add an employee'
      },
      {
        name: 'changeRole',
        type: 'input',
        //// Need to find a way to get all employee ids. Change type to list
        message: 'Select an employee ID:',
        when: (answers) => answers.userOption === 'Update an employee role'
      },
      {
        name: 'changeRolePt2',
        type: 'input',
        //// Need to find a way to get all role titles. Change type to list
        message: 'Select a role ID:',
        when: (answers) => answers.userOption === 'Update an employee role'
      }
    ])
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

      // Reads an sql file, splits each query by semi-colon, then runs each query.
      const schemaSql = fs.readFileSync('./db/schema.sql', 'utf-8');
      const schemaQueries = schemaSql.split(';');
      schemaQueries.forEach((query) => {
        db.query(query, (err, result) => {
          //// Might need to figure out if something should replace null if I'm just making queries.
          err ? console.error(err) : null;
        });
      });

      const seedsSql = fs.readFileSync('./db/schema.sql', 'utf-8');
      const seedsQueries = seedsSql.split(';');
      seedsQueries.forEach((query) => {
        db.query(query, (err, result) => {
          //// Might need to figure out if something should replace null if I'm just making queries.
          err ? console.error(err) : null;
        });
      });

      dbManipulation.chooseTable(response.userOption);

      //// Need to change this based on select, add, or update
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