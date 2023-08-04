const inquirer = require('inquirer');
const connection = require('./db');
const { printTable } = require('console-table-printer');

// Created my menu, declared witgh arrow function and inquierer .prompt
// use this at the end of every fucntion for the menu tot take user back to beginning
const startMenu = () => {
  inquirer
    .prompt({
      message: 'Please choose one of the following:',
      name: 'menu',
      type: 'list',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'EXIT',
      ],
    }) // Else if statements for all of my menu items
    .then((response) => {
      if (response.menu === 'View all departments') {
        viewAllDepartments();
      } else if (response.menu === 'View all roles') {
        viewAllRoles();
      } else if (response.menu === 'View all employees') {
        viewAllEmployees();
      } else if (response.menu === 'Add a department') {
        addDepartment();
      } else if (response.menu === 'Add a role') {
        addRole();
      } else if (response.menu === 'Add an employee') {
        addEmployee();
      } else if (response.menu === 'Update an employee role') {
        updateEmployeeRole();
      } else if (response.menu === 'Delete a department') {
        deleteDepartment();
      } else if (response.menu === 'Delete a role') {
        deleteRole();
      } else if (response.menu === 'Delete an employee') {
        deleteEmployee();
      } else {
        connection.end();
      }
    });
};

// Function to view all departments
const viewAllDepartments = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};

// Function to view all roles
// using table aliases e for employees and r for salary r for role 
const viewAllRoles = () => {
  // Execute SQL query to retrieve roles with department information from the database
  connection.query(
    `SELECT
      r.id,
      r.title,
      d.name AS department,
      r.salary
    FROM role r
    JOIN department d ON r.department_id = d.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startMenu();
    }
  );
};

// Function to view all employees
const viewAllEmployees = () => {
  connection.query(
    `
    SELECT
      e.id,
      e.first_name,
      e.last_name,
      r.title,
      d.name AS department,
      r.salary,
      CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
    `,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startMenu();
    }
  );
};

// Function to add a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'department',
        type: 'input',
        message: 'Please enter a department',
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO department (name) VALUES (?)',
        [answer.department],
        (err, res) => {
          if (err) throw err;
          console.log('Department successfully added!');
          startMenu();
        }
      );
    });
};

// Function to add a role
const addRole = () => {
  connection.query('SELECT id, name FROM department', (err, res) => {
    if (err) throw err;

    const departmentNames = res.reduce((acc, curr) => {
      acc[curr.name] = curr.id;
      return acc;
    });

    inquirer
      .prompt([
        {
          name: 'role',
          type: 'input',
          message: 'Please enter your role in the company.',
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Please enter your salary.',
        },
        {
          name: 'department',
          type: 'list',
          message: 'Please enter which department your role is in.',
          choices: Object.keys(departmentNames),
        },
      ])
      .then((answer) => {
        const departmentID = departmentNames[answer.department];
        connection.query(
          'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
          [answer.role, answer.salary, departmentID],
          (err, res) => {
            console.log('Role Added!');
            startMenu();
          }
        );
      });
  });
};

// Function to add an employee
const addEmployee = () => {
  connection.query('SELECT id, title FROM role', (err, res) => {
    if (err) throw err;

    const roleNames = res.reduce((acc, curr) => {
      acc[curr.title] = curr.id;
      return acc;
    });

    connection.query(
      'SELECT id, first_name, last_name, manager_id FROM employee',
      (err, res) => {
        if (err) throw err;

        const managers = {};

        res.forEach((employee) => {
          const managerName = `${employee.first_name} ${employee.last_name}`;
          managers[managerName] = employee.id;
        });

        inquirer
          .prompt([
            {
              name: 'firstName',
              type: 'input',
              message: 'Please enter your first name.',
            },
            {
              name: 'lastName',
              type: 'input',
              message: 'Please enter your last name.',
            },
            {
              name: 'role',
              type: 'list',
              message: 'Please select your role in the company.',
              choices: Object.keys(roleNames),
            },
            {
              name: 'manager',
              type: 'list',
              message: 'Please select your manager.',
              choices: Object.keys(managers),
            },
          ])
          .then((answer) => {
            const roleID = roleNames[answer.role];
            const managerID = managers[answer.manager];
            connection.query(
              'INSERT INTO employee SET ?',
              {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: roleID,
                manager_id: managerID,
              },
              (err, res) => {
                if (err) throw err;

                console.log('Successfully Added Employee!');
                startMenu();
              }
            );
          });
      }
    );
  });
};

// Function to update an employee's role
const updateEmployeeRole = () => {
  connection.query(
    'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
    (err, res) => {
      if (err) throw err;

      const employees = res.reduce((acc, curr) => {
        acc[curr.name] = curr.id;
        return acc;
      });

      connection.query('SELECT id, title FROM role', (err, res) => {
        if (err) throw err;

        const roles = res.reduce((acc, curr) => {
          acc[curr.title] = curr.id;
          return acc;
        });

        inquirer
          .prompt([
            {
              name: 'employee',
              type: 'list',
              message: 'Please select the employee to Update',
              choices: Object.keys(employees),
            },
            {
              name: 'role',
              type: 'list',
              message: 'Select new role',
              choices: Object.keys(roles),
            },
          ])
          .then((answer) => {
            const employeeId = employees[answer.employee];
            const roleId = roles[answer.role];

            connection.query(
              'UPDATE employee SET role_id = ? WHERE id = ?',
              [roleId, employeeId],
              (err, res) => {
                if (err) throw err;
                console.log(`Role successfully updated for ${answer.employee}`);
                startMenu();
              }
            );
          });
      });
    }
  );
};

// Function to delete an employee
const deleteEmployee = () => {
  // Execute SQL query to select employee names and IDs from the database
    connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, res) => {
      if (err) throw err;
  
      const employees = res.reduce((acc, curr) => {
        acc[curr.name] = curr.id;
        return acc;
      });
  
      inquirer
        .prompt([
          {
            name: 'employee',
            type: 'list',
            message: 'Please select the employee to delete',
            choices: Object.keys(employees),
          },
        ])
        .then((answer) => {
          const employeeId = employees[answer.employee];
          connection.query(
            'DELETE FROM employee WHERE id = ?',
            [employeeId],
            (err, res) => {
              if (err) throw err;
              console.log(`Employee "${answer.employee}" successfully deleted!`);
              startMenu();
            }
          );
        });
    });
  };

// Function to Delete a department (not provided in the code)
const deleteDepartment = () => {
  connection.query('SELECT id, name FROM department', (err, res) => {
    if (err) throw err;

    const departmentNames = res.reduce((acc, curr) => {
      acc[curr.name] = curr.id;
      return acc;
    });

    inquirer
      .prompt([
        {
          name: 'department',
          type: 'list',
          message: 'Please select the department to delete',
          choices: Object.keys(departmentNames),
        },
      ])
      .then((answer) => {
        const departmentID = departmentNames[answer.department];
        // Execute SQL query to delete the selected employee from the database
        connection.query(
          'DELETE FROM department WHERE id = ?',
          [departmentID],
          (err, res) => {
            if (err) throw err;
            console.log(`Department "${answer.department}" successfully deleted!`);
            startMenu();
          }
        );
      });
  });
};

module.exports = {
  startMenu,
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  deleteDepartment,
};
