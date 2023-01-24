const { prompt } = require('inquirer');
const { displayDepartments, allEmployees, allRoles, addRole, addEmployee, addDepartment, updateEmployeeRole } = require('./db/helpers');
// let { allEmployees } = require('./db/index')
// const allEmployees = require('./db/index');
const connector = require('./db/connection');
require('console.table');
const PORT = process.env.PORT || 3306;

// app.listen(PORT, () => {
//     console.log('im listening');

// });







function employeeMenu() {
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
                displayDepartments();
                employeeMenu();
                break;
            case "View All Employees":
                allEmployees();
                employeeMenu();
                break;
            case "View All Roles":
                allRoles();
                employeeMenu();
                break;
            case "Exit Menu":
                console.log('Goodbye.');
                break;
            case "Add a Department":
                addDepartment();
                employeeMenu();
                break;
            case "Add an Employee":
                addEmployee();
                employeeMenu();
                break;
            case "Add a Role":
                addRole();
                employeeMenu();
                break;
            case "Update an Employee Role":
                updateEmployeeRole();
                
                // employeeMenu();
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




employeeMenu();

module.exports = employeeMenu;