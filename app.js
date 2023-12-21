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
        message: 'Provide a first name.',
        when: (answers) => answers.userOption === 'Add an employee'
      },
      {
        name: 'newEmployeePt2',
        type: 'input',
        message: 'Provide a last name.',
        when: (answers) => answers.userOption === 'Add an employee'
      },
      {
        name: 'newEmployeePt3',
        type: 'confirm',
        message: 'Is this employee a manager?',
        when: (answers) => answers.userOption === 'Add an employee'
      },
      {
        name: 'newEmployeePt4',
        type: 'input',
        message: 'Provide a manager ID to assign a manager to the new employee.',
        when: (answers) => answers.newEmployeePt3 === false
      },
      {
        name: 'changeRole',
        type: 'input',
        message: 'Provide an employee ID.',
        when: (answers) => answers.userOption === 'Update an employee role'
      },
      {
        name: 'changeRolePt2',
        type: 'input',
        message: 'Provide a role ID.',
        when: (answers) => answers.userOption === 'Update an employee role'
      }
      {
        name: 'changeRolePt3',
        type: 'input',
        message: 'Provide a manager ID to assign a manager to the employee.',
        when: (answers) => answers.changeRolePt2 === 1
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
        },
        console.log('Connected to legitimate_business_db database.')
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

      // Handles database interaction based on user-specified query type.
      let managerId;
      switch (dbManipulation.queryType) {
        case 'select':
          dbManipulation.interactDb();
          break;
        case 'add':
          //// New departments and roles functions need to be here as well. Maybe nest another switch statement
          switch (dbManipulation.activeTable) {
            case 'department':
              dbManipulation.interactDb(response.newDepartment);
              break;
            case 'role':
              dbManipulation.interactDb(response.newRole, response.newRolePt2);
              break;
            case 'employee':
              response.newEmployeePt3 ? managerId = null : managerId = response.newEmployeePt4;
              dbManipulation.interactDb('add', response.newEmployee, response.newEmployeePt2, managerId);
              break;
            default:
              console.log('Error: No table selected.');
          };
          break;
        case 'update':
          response.changeRolePt2 === 1 ? managerId = null : managerId = response.changeRolePt3;
          dbManipulation.interactDb('update', response.newEmployee, response.newEmployeePt2, managerId);
          break;
      }
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

// Initializes the app.
init();