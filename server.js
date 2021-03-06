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
  const sql = `SELECT role.*, department.name AS department
               FROM role
               LEFT JOIN department ON role.department_id = department.id;`

  db.query(sql, function (error, res) {
    console.table(res);
    endOrMain();
  });
};

// View all Employees
function viewAllEmployees() {
  const sql = `SELECT employee.*, 
               role.job_title, 
               role.salary, 
               role.department_id, 
               department.name AS department
               FROM employee
               LEFT JOIN role ON employee.role_id = role.id
               LEFT JOIN department ON role.department_id = department.id`
               
  db.query(sql, function (error, res) {
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
    },
    {
      type: "input",
      message: "Please provide a description of the new department.",
      name: "description"
    }
  ])
  .then(function (response) {
    newDepartment(response);
  });
};

function newDepartment(data) {
  db.query("INSERT INTO department SET ?", {
    name: data.name,
    description: data.description
    },
    function (error, res) {
      if (error) throw error;
    });

      endOrMain();
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
        message: "What is the job title of the employee?",
        name: "title",
        choices: roles
      },
      {
        type: "list",
        message: "Who is the manager of the employee?",
        name: "manager",
        choices: employees,
        default: false
      }
  ])
  .then(function (response) {
    newEmployee(response);
  });
};

function newEmployee(data) {
  db.query("INSERT INTO employee SET ?", {
    first_name: data.firstName,
    last_name: data.lastName,
    role_id: data.title,
    manager_id: data.manager
  }, function (error, res) {
    if (error) throw error;
  });
endOrMain();
}


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

function addNewRole(data) {
db.query("INSERT INTO role SET ?", {
  job_title: data.title,
  salary: data.salary,
  department_id: data.id
  }, function (error, res) {
    if (error) throw error;
  });
  endOrMain();
};
// End functions for adding


// Function for updating employee role
function updateRole() {
  inquirer.prompt(
    [
      {
        type: "list",
        message: "Which employee is updating their role?",
        name: "employeeID",
        choices: employees
      },
      {
        type: "list",
        message: "What is the new role?",
        name: "titleID",
        choices: roles
      }
    ])
    .then(function (response) {
      updateEmployeesRole(response);
    });
};

function updateEmployeesRole(data) {
  db.query(`UPDATE employee SET role_id = ${data.titleID} WHERE id =${data.employeeID}`,
    function (error, res) {
      if (error) throw error;
    });
  endOrMain();
};


// Function to end or return to main menu
function endOrMain() {
  inquirerConfirm("Do you want to continue?")
    .then(function confirmed() {
      initialPrompt();
    }, function cancelled() {
      end();
    });
};


function end() {
  console.log("Exiting Employee Manager");
  db.end();
  process.exit();
};