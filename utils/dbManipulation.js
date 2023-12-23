const mysql = require('mysql2');

// Sets the query type and current table based on a user-specified option select.
function chooseTable(data) {
  let queryType = '';
  let activeTable = '';

  switch(data){
    case 'View all departments':
      queryType = 'select';
      activeTable = 'department';
      return { type: queryType, table: activeTable };
      break;
    case 'View all roles':
      queryType = 'select';
      activeTable = 'role';
      return { type: queryType, table: activeTable };
      break;
    case 'View all employees':
      queryType = 'select';
      activeTable = 'employee';
      return { type: queryType, table: activeTable };
      break;
    case 'Add a department':
      queryType = 'add';
      activeTable = 'department';
      return { type: queryType, table: activeTable };
      break;
    case 'Add a role':
      queryType = 'add';
      activeTable = 'role';
      return { type: queryType, table: activeTable };
      break;
    case 'Add an employee':
      queryType = 'add';
      activeTable = 'employee';
      return { type: queryType, table: activeTable };
      break;
    case 'Update an employee role':
      queryType = 'update';
      activeTable = 'employee';
      return { type: queryType, table: activeTable };
      break;
    default:
      console.log('An error occurred while selecting a table.');
  }
};

function interactDb(...args) {
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

  // console.log(args.length);  // Test
  switch (args.length) {
    case 1:
      // 1 arg: table
      // Query that selects all results from a user-specified MySQL table.
      db.query(`SELECT * FROM ${args[0]}`, function (err, results) {
        err ? console.error(err) : console.log(results);
      });
      break;
    case 2:
      // 2 args: table, department name
      // Query that adds a new department to the department table.
      db.query(`INSERT INTO ${args[0]} (name) VALUES ('${args[1]}')`, function (err, results) {
        err ? console.error(err) : console.log(`Successfully added ${args[1]} department.`);
      });
      break;
    case 4:
      // args[0] is the table
      switch(args[0]) {
        case 'role':
          // 4 args: table, title name, salary amount, department ID
          // Query that adds a new role to the role table.
          db.query(`INSERT INTO ${args[0]} (title, salary, department_id) VALUES ('${args[1]}', ${args[2]}, ${args[3]})`, function (err, results) {
            err ? console.error(err) : console.log(`Successfully added ${args[1]} title to ${args[3]} department with salary of $${args[2]}.`);
          });
          break;
        case 'employee':
          // 4 args: table, employee ID, role ID, manager ID
          // Query that updates an employee row with new information.
          db.query(`UPDATE ${args[0]} SET role_id = ${args[2]}, manager_id = ${args[3]} WHERE id = ${args[1]}`, function (err, results) {
            err ? console.error(err) : console.log(`Update successful.\nEmployee ID: ${args[1]}\nRole ID: ${args[2]}\nManager ID: ${args[3]}`);
          });
          break;
        default:
          console.log('Error: No table selected.');
      };
      break;
    case 5:
      // 5 args: table, first name, last name, role ID, manager ID
      // Query that adds a new employee to the employee table.
      db.query(`INSERT INTO ${args[0]} (first_name, last_name, role_id, manager_id) VALUES ('${args[1]}', '${args[2]}', ${args[3]}, ${args[4]})`, function (err, results) {
        err ? console.error(err) : console.log(`Successfully added ${args[1]} ${args[2]}.`);
      });
      break;
    default:
      console.log('Inappropriate number of arguments given.');
  }
};

module.exports = {
  chooseTable: chooseTable,
  interactDb: interactDb
};