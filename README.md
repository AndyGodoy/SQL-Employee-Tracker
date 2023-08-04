## Employee Management Tracking System
This is a command-line application that allows you to manage employees, roles, and departments in a company database. The application accepts user input and provides various options to interact with the database.

## Installation
To run the Employee Management System, you need to have Node.js installed on your computer. Follow these steps to get started:

Clone this repository to your local machine.

Navigate to the project directory in the terminal.

Install the required dependencies using the following command:

npm install

Set up your MySQL database and connection by modifying the db.js file.

## Usage
Start the application by running the following command in the terminal:

node index.js

Upon starting the application, you will be presented with the main menu that includes the following options:

View all departments
View all roles
View all employees
Add a department
Add a role
Add an employee
Update an employee role
Exit
Choose an option by using the arrow keys and press Enter to select.

## View all departments
When you choose to view all departments, the application will display a formatted table showing the department names and department IDs.

## View all roles
When you choose to view all roles, the application will display a formatted table showing the job title, role ID, the department that role belongs to, and the salary for that role.

## View all employees
When you choose to view all employees, the application will display a formatted table showing employee data, including employee IDs, first names, last names, job titles, departments, salaries, and managers that the employees report to.

## Add a department
When you choose to add a department, the application will prompt you to enter the name of the department, and that department will be added to the database.

## Add a role
When you choose to add a role, the application will prompt you to enter the name, salary, and department for the role, and that role will be added to the database.

## Add an employee
When you choose to add an employee, the application will prompt you to enter the employee’s first name, last name, role, and manager. The employee will then be added to the database.

## Update an employee role
When you choose to update an employee role, the application will prompt you to select an employee to update and their new role. The employee's information will be updated in the database.

## Credits
W3 Schools,
MDZILLA,
UCB activities,
Google,
npm documents

