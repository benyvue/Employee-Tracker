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