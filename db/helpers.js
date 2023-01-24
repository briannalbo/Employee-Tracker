
const connector = require('./connection');
const inquirer = require('inquirer');




function displayDepartments() {
    console.log("Viewing all departments");
   connector.query("SELECT * FROM department;", function (err, res) {
      if (err) throw err;
      console.table(res);
    });
  };

  function allEmployees() {
    console.log("Viewing all employees");
    connector.query("SELECT * FROM employee;", function (err, res) {
      if (err) throw err;
      console.table(res);
    });
  };

  function allRoles() {
    console.log("Viewing all roles");
    connector.query("SELECT * FROM roles;", function (err, res) {
      if (err) throw err;
      console.table(res);
    });
  };

  function addRole() {
    console.log("Adding a role");
    connector.query("SELECT * FROM department;", function (err, res) {
      if (err) throw err;
      const departments = res;
  
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

  function addEmployee() {
    console.clear();
    connector.query("SELECT * FROM roles;", function (err, res) {
      if (err) throw err;
      const roles = res;
  
      connector.query("SELECT * FROM employee;", function (err, res) {
        if (err) throw err;
        const managers = res;
  
        const empQ = () => {
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

  function addDepartment() {
    const newDepartment = () => {
      return inquirer
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
        .then(() => {
          console.log("Department added!");
          employeeMenu();
        })
        .catch((err) => console.log(err));
    };
    newDepartment();
  };

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
            .then(() => {
              console.log("Employee role updated!");
              // employeeMenu();
            })
            .catch((err) => console.log(err));
        };
        updateEmpQ();
        
      });
    });
  }
  


module.exports =  { displayDepartments, allEmployees, allRoles, addRole, addEmployee, addDepartment, updateEmployeeRole };

