DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCGAR(30) NOT NULL
);

CREATE TABLE role (
    id NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(30) NOT NULL,
    Salary DECIMAL NOT NULL,
    department_id INT,
    INDEX dept_index (department_id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    INDEX role_index (role_id),
    FOREIGN KEY (role_id),
    REFERENCES role(id),
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id),
    REFERENCES employee(id),
    ON DELETE SET NULL
);