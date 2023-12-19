queryAction = '';
activeTable = '';

//// Change all db's into tables
// Returns a user-specified MySQL database as a string.
function chooseTable(data) {
  switch(data){
    case 'View all departments':
      queryAction = 'select';
      activeTable = 'departments';
      break;
    case 'View all roles':
      queryAction = 'select';
      activeTable = 'roles';
      break;
    case 'View all employees':
      queryAction = 'select';
      activeTable = 'employees';
      break;
    case 'Add a department':
      queryAction = 'add';
      activeTable = 'departments';
      break;
    case 'Add a role':
      queryAction = 'add';
      activeTable = 'roles';
      break;
    case 'Add an employee':
      queryAction = 'add';
      activeTable = 'employees';
      break;
    case 'Update an employee role':
      queryAction = 'update';
      activeTable = 'employees';
      break;
    default:
      console.log('An error occurred while selecting a database.');
  }
};

/* //// Might not need this function if I can use a global variable to set the action in chooseDb()
// Returns an action based on a user-specified option select.
function setAction(option) {
  switch(option){
    case 'View all departments':
      return 'departments_db';
      break;
    case 'View all roles':
      return 'roles_db';
      break;
    case 'View all employees':
      return 'employees_db';
      break;
    case 'Add a department':
      return 'departments_db';
      break;
    case 'Add a role':
      return 'roles_db';
      break;
    case 'Add an employee':
      return 'employees_db';
      break;
    case 'Update an employee role':
      return 'employees_db';
      break;
    default:
      console.log('An error occurred while selecting a database.');
  }
} */

// Interacts with a database depending on which action is queried.
function interactDb(action) {
  switch(action){
    case 'view':
      // Query that selects all from a user-specified MySQL database.
      db.query(`SELECT * FROM ${activeTable}`, function(err, results) {
        err ? console.error(err) : console.log(results);
      });
      break;
    case 'add':
      
      break;
    case 'update':
      
      break;
    case '':
      console.log('Error: No database specified.')
      break;
    default:
      console.log('An error occurred while interacting with the database.');
  }
};

module.exports = {
  queryAction: queryAction,
  chooseTable: chooseTable,
  interactDb: interactDb
};