-- Create a database to store departments, roles, and employees
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;


CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);


-- Create command line interface - Create a main menu that can view ALL:
-- Roles, employees, adds a department, add a role, add an employee, and update and employee role


                            -- IMPLEMENT FUNCTIONS FOR :
-- view all departments, fetch all departments from the database and display them in a table (console.table)
-- view all roles, fetch all roles from database along with the corresponding department info and display on table
-- view all employees, fetch all employees from database along with their role, department, salary, and manager infromation.
-- Add a department, prompt user to enter the name of the new department, add the department to the database
-- Add a Role, prompt user to enter the name, salary, and department for the new role. Add role to databse
-- Add an employee, prompt the user to enter the first name, last name, role, and manager for the new employee
-- Add the employee to the Database
-- Update an employee role, prompt user to select an employee to update
-- prompt user to select new role for the employee
-- Update the employees role in the database.

-- Connect to the database, create a connection to mySql database using the 'mysql' package

-- Run the application, start the app and display the main menu to the user. 
-- Handle user input and execut the corresponding functions based on their choices

-- Test the application: make adjustments as needed/.