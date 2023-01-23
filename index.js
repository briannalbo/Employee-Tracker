const { prompt } = require('inquirer');
const db = require('./db');
require('console.table');
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log('im listening');

});

function employeeMenu() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    // value: "View_Employees"
                },
                {
                    name: "View All Employees by Department",
                    // value: "View_Employees_By-Department"
                },
                {
                    name: "Exit Menu",
                    // value: "Exit"
                },
            ]
        }
    ])
//     .then(res => {
//         let choice = res.choice;
//         switch (choice) {
//             case "View_Employees":
//                 viewEmp();
//                 break;
//             case "View_Employees_By_Department":
//                 console.log('here they are');
//                 break;
//             case "Exit":
//                 console.log('Goodbye.');
//                 break;
//                 default:
//                     console.log('???????')

//         }
//     }
// )
}


// function viewEmp() {
//     db.displayAllEmp()
//     .then(([rows]) => {
//         let employees = rows;
//         console.table(employees);
//     }
// )
//     .then(() => employeeMenu());
// }

employeeMenu();