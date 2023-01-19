const inquirer = require('inquirer');
const db = require('./db');

function employeeMenu() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'choice',
            message: "What would you like to do?",
            choices: [
                {
                    name: 'View All Employees'
                },
                {
                    name: 'View All Employees by Department',
                },
                {
                    name: 'Exit Menu'
                }
            ]
        }
    ])
}

employeeMenu();