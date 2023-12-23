// Imports dependencies.
const express = require('express');
const inquirer = require('inquirer');
// const fs = require('fs');  // Only needed if reading or writing a file
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
          'Update an employee role',
          'Close program'
        ]
      },
      {
        name: 'newDepartment',
        type: 'input',
        message: 'Provide a name for the new department.',
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
        name: 'newRolePt3',
        type: 'input',
        message: 'Provide a department ID to assign a department for the new role.',
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
        type: 'input',
        message: 'Provide a role ID to assign a role.',
        when: (answers) => answers.userOption === 'Add an employee'
      },
      {
        name: 'newEmployeePt4',
        type: 'confirm',
        message: 'Is this employee a manager?',
        when: (answers) => answers.userOption === 'Add an employee'
      },
      {
        name: 'newEmployeePt5',
        type: 'input',
        message: 'Provide a manager ID to assign a manager to the new employee.',
        when: (answers) => answers.newEmployeePt4 === false
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
      },
      {
        name: 'changeRolePt3',
        type: 'input',
        message: 'Provide a manager ID to assign a manager to the employee.',
        when: (answers) => (answers.changeRolePt2 % 2) === 0
      }
    ])
    .then((response) => {
/*       // Reads an sql file, splits each query by semi-colon, then runs each query.
      const schemaSql = fs.readFileSync('./db/schema.sql', 'utf-8');
      const schemaQueries = schemaSql.split(';');
      schemaQueries.forEach((query) => {
        db.query(`${query}`, (err, result) => {
          //// Might need to figure out if something should replace null if I'm just making queries.
          err ? console.error(err) : null;
        });
      });

      const seedsSql = fs.readFileSync('./db/seeds.sql', 'utf-8');
      const seedsQueries = seedsSql.split(';');
      seedsQueries.forEach((query) => {
        db.query(`${query}`, (err, result) => {
          //// Might need to figure out if something should replace null if I'm just making queries.
          err ? console.error(err) : null;
        });
      }); */

      // Closes the program
      if (response.userOption === 'Close program') {
        console.log('Closing program.');
        process.exit(0);
      };

      const dbInfo = dbManipulation.chooseTable(response.userOption);
      // console.log(dbInfo);  // [type, table]

      // Handles database interaction based on user-specified query type.
      let managerId;
      switch (dbInfo.type) {
        case 'select':
          dbManipulation.interactDb(dbInfo.table);
          break;
        case 'add':
          switch (dbInfo.table) {
            case 'department':
              dbManipulation.interactDb(dbInfo.table, response.newDepartment);
              break;
            case 'role':
              dbManipulation.interactDb(dbInfo.table, response.newRole, response.newRolePt2, response.newRolePt3);
              break;
            case 'employee':
              response.newEmployeePt4 ? managerId = null : managerId = response.newEmployeePt5;
              dbManipulation.interactDb(dbInfo.table, response.newEmployee, response.newEmployeePt2, response.newEmployeePt3, managerId);
              break;
            default:
              console.log('Error: No table selected.');
          };
          break;
        case 'update':
          (response.changeRolePt2 % 2) === 1 ? managerId = null : managerId = response.changeRolePt3;
          dbManipulation.interactDb(dbInfo.table, response.changeRole, response.changeRolePt2, managerId);
          break;
        default:
          console.log('Error: no query type selected.');
      };
    })
    .catch((err) => console.error(err));
};

// Default response for any unlisted request.
app.use((req, res) => {
  res.status(404).json('Database not found.');
});

app.listen(PORT, () => 
  console.log(`Listening on ${PORT}`)
);

// Initializes the app.
init();