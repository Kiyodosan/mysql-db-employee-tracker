queryType = '';
activeTable = '';

//// Might need to change activeTable assignment to a return statement instead
// Sets the query type and current table based on a user-specified option select.
function chooseTable(data) {
  switch(data){
    case 'View all departments':
      queryType = 'select';
      activeTable = 'department';
      break;
    case 'View all roles':
      queryType = 'select';
      activeTable = 'role';
      break;
    case 'View all employees':
      queryType = 'select';
      activeTable = 'employee';
      break;
    case 'Add a department':
      queryType = 'add';
      activeTable = 'department';
      break;
    case 'Add a role':
      queryType = 'add';
      activeTable = 'role';
      break;
    case 'Add an employee':
      queryType = 'add';
      activeTable = 'employee';
      break;
    case 'Update an employee role':
      queryType = 'update';
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

/* //// Maybe need to make a switch statement that inputs different values for different tables
//// Make an if or switch statement to choose between the add and update functions.
// Query that adds a row to a user-specified MySQL table.
function interactDb(fName, lName, manager_id) {
  db.query(`INSERT INTO ${activeTable} (first_name, last-name, manager_id) VALUES ('${fName}', '${lName}', '${manager_id})`, function (err, results) {
    err ? console.error(err) : console.log(`Successfully added ${fName} ${lName}.`);
  });
};

//// Create logic to change manager_id to an INT or null, depending on which role is being given
// Query that updates a row from a user-specified MySQL table.
function interactDb(employeeId, roleId, manager_id) {
  db.query(`UPDATE ${activeTable} SET role_id = ${roleId}, manager_id = ${manager_id} WHERE id = ${employeeId}`, function (err, results) {
    err ? console.error(err) : console.log(`Update successful.\nEmployee ID: ${employeeId}\nRole ID: ${roleId}`);
  });
}; */

// Query that adds a new department to the department table.
function interactDb(deptName) {
  db.query(`INSERT INTO ${activeTable} (name) VALUES ('${deptName}')`, function (err, results) {
    err ? console.error(err) : console.log(`Successfully added ${deptName} department.`);
  });
}

// Query that adds a new role to the role table.
function interactDb(titleName, salaryAmt) {
  db.query(`INSERT INTO ${activeTable} (title, salary) VALUES ('${titleName}', ${salaryAmt})`, function (err, results) {
    err ? console.error(err) : console.log(`Successfully added ${titleName} title with salary of $${salaryAmt}.`);
  });
}

function interactDb(type, info, info2, manager_id) {
  switch (type) {
    case 'add':
      // Query that adds a new employee to the employee table.
      db.query(`INSERT INTO ${activeTable} (first_name, last-name, manager_id) VALUES ('${info}', '${info2}', '${manager_id}')`, function (err, results) {
        err ? console.error(err) : console.log(`Successfully added ${info} ${info2}.`);
      });
      break;
    case 'update':
      // Query that updates an employee row with new information.
      db.query(`UPDATE ${activeTable} SET role_id = ${info2}, manager_id = ${manager_id} WHERE id = ${info}`, function (err, results) {
        err ? console.error(err) : console.log(`Update successful.\nEmployee ID: ${info}\nRole ID: ${info2}\nManager ID: ${manager_id}`);
      });
      break;
    default:
      console.log('Inappropriate query type selected. Allowed types: add, update');
  };
};

module.exports = {
  queryType: queryType,
  activeTable: activeTable,
  chooseTable: chooseTable,
  interactDb: interactDb
};