const inquirer = require('inquirer');
const db = require('./db/connection');
const consoleTable = require('console.table');
const inquirerConfirm = require('inquirer-confirm');

const PORT = process.env.PORT || 3001;


// Connection to MySQL 
db.connect(function (error) {
  if (error) throw error;
    console.log("Welcome to Employee Manager");

  // Roles Query
  db.query("SELECT * from role", function (error, res) {
    roles = res.map(role => ({
      name: role.title,
      value: role.id
    }));
  });

  // Department query
  db.query("SELECT * from department", function (error, res) {
    departments = res.map(dep => ({
      name: dep.name,
      value: dep.id
    }));
  });

  // Employee query
  db.query("SELECT * from employee", function (error, res) {
    employees = res.map(emp => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id
    }));
  });

  initialPrompt();

});


// Initial Prompt
function initialPrompt() {
  inquirer.prompt({
    type: "list",
    message: "What would you like to do?",
    name: "choices",
    choices: [
      {
        name: "View All Departments",
        value: "viewAllDepartments"
      },
      {
        name: "View All Roles",
        value: "viewAllRoles"
      },
      {
        name: "View All Employees",
        value: "viewAllEmployees"
      },
      {
        name: "Add A Department",
        value: "addDepartment"
      },
      {
        name: "Add A Role",
        value: "addRole"
      },
      {
        name: "Add An Employee",
        value: "addEmployee"
      },
      {
        name: "Update An Employee Role",
        value: "updateRole"
      },
      {
        name: "End",
        value: "end"
      }
    ]
  }).then(function (res) {
      mainMenu(res.choices)
    });
};


// Main Menu
function mainMenu(options) {
  switch (options) {
    case "viewAllDepartments":
      viewAllDepartments();
      break;
    case "viewAllRoles":
      viewAllRoles();
      break;
    case "viewAllEmployees":
      viewAllEmployees();
      break;
    case "addDepartment":
      addDepartment();
      break;
    case "addRole":
      addRole();
      break;
    case "addEmployee":
      addEmployee();
      break;
    case "updateRole":
      updateRole();
      break;
    case "end":
      end();
  };
};


// Functions for viewing, section
// View all Departments
function viewAllDepartments() {
  db.query("SELECT * FROM department", function (error, res) {
    console.table(res);
    endOrMain();
  });
};

// View all Roles
function viewAllRoles() {
  db.query("SELECT * FROM role", function (error, res) {
    console.table(res);
    endOrMain();
  });
};

// View all Employees
function viewAllEmployees() {
  db.query("SELECT * FROM employee", function (error, res) {
    console.table(res);
    endOrMain();
  });
};
// End functions for viewing 


// Functions for adding, section
// Add Department
function addDepartment() {
  inquirer.prompt(
  [
    {
      type: "input",
      message: "What is the new department name?",
      name: "name"
    }
  ])
  .then(function (response) {
    newDepartment(response);
  });
};

// Add Employee
function addEmployee() {
  inquirer.prompt(
    [
      {
        type: 'input',
        message: "What is the employee's first name?",
        name: "firstName",
      },
      {
        type: 'input',
        message: "What is the employee's last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is the title of the employee?",
        name: "title",
        choices: roles
      },
      {
        type: "list",
        message: "Who is the manager of the employee?",
        name: "manager",
        choices: employees
      }
  ])
  .then(function (response) {
    newEmployee(response);
  });
};

// Add Role
function addRole() {
  inquirer.prompt(
  [
    {
      type: "input",
      message: "What is the name of the new role?",
      name: "title"
    },
    {
      type: "input",
      message: "What is the salary of the new role?",
      name: "salary"

    },
    {
      type: "list",
      message: "Which department is the new role in?",
      name: "id",
      choices: departments
    }
  ])
  .then(function (response) {
    addNewRole(response);
  });
};
// End functions for adding