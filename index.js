//sets all required packages
//imports db connection
const connector = require('./db/connection');
const inquirer = require('inquirer');
const { prompt } = require('inquirer');
require('console.table');
// const PORT = process.env.PORT || 3306;

//function used to display departments & their ids if user selects to view all departments in main menu
function displayDepartments() {
    console.log("Viewing all departments");
   connector.query("SELECT * FROM department;", function (err, res) {
      if (err) throw err;
      console.table(res);
    });
  };
//function used to display all employees and their info 
  function allEmployees() {
    console.log("Viewing all employees");
    connector.query("SELECT employee.id,employee.first_name, employee.last_name, roles.title, department.dept_name, roles.salary, employee.manager_id, CONCAT(m.first_name, m.last_name) as manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.dept_id = department.id LEFT JOIN employee as e ON employee.id = e.manager_id LEFT JOIN employee as m ON employee.manager_id = m.id ORDER BY employee.id;", 
    function (err, res) {
      if (err) throw err;
      console.table(res);
    });
  };
//function used to display all roles in company
  function allRoles() {
    console.log("Viewing all roles");
    connector.query("SELECT * FROM roles;", function (err, res) {
      if (err) throw err;
      console.table(res);
    });
  };
//allows user to add a new role to the db
  function addRole() {
    console.log("Adding a role");
    connector.query("SELECT * FROM department;", function (err, res) {
      if (err) throw err;
      const departments = res;
  //prompt to gather user preferences on new role
      const roleQ = () => {
        console.clear();
        return inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "What is the title of the role?",
            },
            {
              type: "input",
              name: "salary",
              message: "What is the salary of the role?",
            },
            {
              type: "list",
              name: "department_id",
              message: `What is the name of the department?`,
              choices: departments.map((department) => ({
                name: department.dept_name,
                value: department.id,
              })),
            },
          ])
          //inserts new role added by user to the role table
          .then((answers) => {
            console.log(answers);
            connector.query(
              "INSERT INTO roles SET ?",
              {
                title: answers.title,
                salary: answers.salary,
                dept_id: answers.department_id,
              },
              function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role inserted!\n");
              }
            );
          })
          .then(() => {
            console.log("Role added!");
            employeeMenu();
          })
          .catch((err) => console.log(err));
      };
      roleQ();
    });
  };
// adds new employee to db
  function addEmployee() {
    console.clear();
    connector.query("SELECT * FROM roles;", function (err, res) {
      if (err) throw err;
      const roles = res;
  
      connector.query("SELECT * FROM employee;", function (err, res) {
        if (err) throw err;
        const managers = res;
  //prompt to gather user input of new employee
        const empQ = () => {
          console.clear();
          return inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: "What is the first name of the employee?",
              },
              {
                type: "input",
                name: "last_name",
                message: "What is the last name of the employee?",
              },
              {
                type: "list",
                name: "role_id",
                message: "What is the role of the employee?",
                choices: roles.map((role) => ({
                  name: role.title,
                  value: role.id,
                })),
              },
              {
                type: "list",
                name: "manager_id",
                message: "Who is the manager of the employee?",
                choices: managers.map((manager) => ({
                  name: manager.first_name + " " + manager.last_name,
                  value: manager.id,
                })),
              },
            ])
            //adds new employee to the employee table in db
            .then((answers) => {
              console.log(answers);
              connector.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: answers.first_name,
                  last_name: answers.last_name,
                  role_id: answers.role_id,
                  manager_id: answers.manager_id,
                },
                function (err, res) {
                  if (err) throw err;
                  console.clear();
                  console.log(res.affectedRows + " employee inserted!\n");
                }
              );
            })
            //confirms employee has been added and returns user to main menu
            .then(() => {
              console.log("Employee added!");
              employeeMenu();
            })
            .catch((err) => console.log(err));
        };
  
        empQ();
      });
    });
  };
//allows user to add a new department to the db
  function addDepartment() {
    const newDepartment = () => {
      console.clear();
      return inquirer
    //prompt to gather info from user about the new department
        .prompt([
          {
            type: "input",
            name: "name",
            message: "What is the name of the department?",
            validate: (nameInput) => {
              if (nameInput) {
                return true;
              } else {
                console.log("Please enter the name of the department!");
                return false;
              }
            },
          },
        ])
        //pushes new department to department table in db
        .then((answers) => {
          console.log(answers);
          connector.query(
            "INSERT INTO department SET ?",
            { dept_name: answers.name },
            function (err, res) {
              if (err) throw err;
              console.clear();
              console.log(res.affectedRows + " department inserted!\n");
            }
          );
        })
        //confirms new department has been added and returns user to main menu
        .then(() => {
          console.log("Department added!");
          employeeMenu();
        })
        .catch((err) => console.log(err));
    };
    newDepartment();
  };
//allows user to update a current employees info
  function updateEmployeeRole() {
    // console.clear();
    connector.query("SELECT * FROM employee;", function (err, res) {
      if (err) throw err;
      const employees = res;
      connector.query("SELECT * FROM roles;", function (err, res) {
        if (err) throw err;
        const roles = res;
  
        const updateEmpQ = () => {
          console.clear();
          return inquirer
        //prompt to collect info from user about which employee they want to update
            .prompt([
              {
                type: "list",
                name: "employee_id",
                message: "What is the name of the employee?",
                choices: employees.map((employee) => ({
                  name: employee.first_name + " " + employee.last_name,
                  value: employee.id,
                })),
              },
              {
                type: "list",
                name: "role_id",
                message: "What is the new role of the employee?",
                choices: roles.map((role) => ({
                  name: role.title,
                  value: role.id,
                })),
              },
            ])
            .then((answers) => {
              //updates the existing employees info in the db
              console.log(answers);
              connector.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [answers.role_id, answers.employee_id],
                function (err, res) {
                  if (err) throw err;
                  console.clear();
                  console.log(res.affectedRows + " employee updated!\n");
                  
                }
              )
            })
            //confirms employee info has been updates & returns user to main menu
            .then(() => {
              console.log("Employee role updated!");
              employeeMenu();
            })
            .catch((err) => console.log(err));
        };
        updateEmpQ();
        
      });
    });
  }

//main menu for users to select what info they would like to view, add, or update
  function employeeMenu() {
    console.log('Welcome to the Employee Database!');
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Departments"
                },
                {
                    name: "View All Employees"
                },
                {
                    name: "View All Roles"
                },
                {
                    name: "Add a Department"
                },
                {
                    name: "Add an Employee"
                },
                {
                    name: "Add a Role"
                },
                {
                    name: "Update an Employee Role"
                },
                {
                    name: "Exit Menu"
                },
            ]
        }
    ])
    .then((data) => {
        switch (data.choice) {
            case "View All Departments":
              console.clear();
                displayDepartments();
                employeeMenu();
                console.clear();
                break;
            case "View All Employees":
              console.clear();
                allEmployees();
                employeeMenu();
                console.clear();
                break;
            case "View All Roles":
              console.clear();
                allRoles();
                employeeMenu();
                console.clear();
                break;
            case "Exit Menu":
                console.log('Goodbye.');
                break;
            case "Add a Department":
                addDepartment();
                
                break;
            case "Add an Employee":
                addEmployee();
                
                break;
            case "Add a Role":
                addRole();
                
                break;
            case "Update an Employee Role":
                updateEmployeeRole();
                break;
            case "Exit Menu":
                console.log('Goodbye.')
            default:
                    console.log('???????')
                    break;

        }
    }
)
};

//calls main menu to display in console
employeeMenu();

