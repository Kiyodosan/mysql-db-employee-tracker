// queryAction = '';
activeTable = '';

//// Might need to change activeTable assignment to a return statement instead
// Returns a user-specified MySQL database as a string.
function chooseTable(data) {
  switch(data){
    case 'View all departments':
      // queryAction = 'select';
      activeTable = 'department';
      break;
    case 'View all roles':
      // queryAction = 'select';
      activeTable = 'role';
      break;
    case 'View all employees':
      // queryAction = 'select';
      activeTable = 'employee';
      break;
    case 'Add a department':
      // queryAction = 'add';
      activeTable = 'department';
      break;
    case 'Add a role':
      // queryAction = 'add';
      activeTable = 'role';
      break;
    case 'Add an employee':
      // queryAction = 'add';
      activeTable = 'employee';
      break;
    case 'Update an employee role':
      // queryAction = 'update';
      activeTable = 'employee';
      break;
    default:
      console.log('An error occurred while selecting a database.');
  }
};

// Query that selects all results from a user-specified MySQL table.
function interactDb() {
  db.query(`SELECT * FROM ${activeTable}`, function (err, results) {
    err ? console.error(err) : console.log(results);
  });
};

//// Maybe need to make a switch statement that inputs different values for different tables
//// Update this function with fName, lName, manager_id
// Query that adds a row to a user-specified MySQL table.
function interactDb(fName, lName) {
  db.query(`INSERT INTO ${activeTable} (first_name, last-name) VALUES ('${fName}', '${lName}')`, function (err, results) {
    err ? console.error(err) : console.log(`Successfully added ${fName} ${lName}.`);
  });
};

// Query that updates a row from a user-specified MySQL table.
function interactDb(employeeId, roleId) {
  db.query(`UPDATE ${activeTable} SET role_id = ${roleId} WHERE id = ${employeeId}`, function (err, results) {
    err ? console.error(err) : console.log(`Update successful.\nEmployee ID: ${employeeId}\nRole ID: ${roleId}`);
  });
};

module.exports = {
  queryAction: queryAction,
  chooseTable: chooseTable,
  interactDb: interactDb
};