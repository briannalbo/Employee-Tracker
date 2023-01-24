const { prompt } = require('inquirer');
const { displayDepartments, allEmployees, allRoles } = require('./db/index');
// let { allEmployees } = require('./db/index')
// const allEmployees = require('./db/index');
const db = require('./db');
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
            default:
                    console.log('???????')
                    break;

        }
    }
)
};




employeeMenu();