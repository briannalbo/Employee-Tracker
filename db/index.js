
const connector = require('./connection');



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

module.exports =  { displayDepartments, allEmployees, allRoles };

