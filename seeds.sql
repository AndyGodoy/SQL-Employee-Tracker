INSERT INTO department (name)
VALUES  ('Sales'),
        ('Service'),
        ('Human Resources'),
        ('Customer Service'),
        ('Management'),
        ('Accounting'),
        ('Office administration'),
        ('IT department');


INSERT INTO role (title, salary, department_id)
VALUES  ('Salesman', 60000, 1),
        ('Service Technician', 75000, 2),
        ('Human Resources Rep', 70000, 3),
        ('Customer service specialist', 45000, 4),
        ('Regional Manager', 90000, 5),
        ('Accountant', 75000, 6),
        ('Receptionist', 45000, 7),
        ('IT specialist', 65000, 8);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Bob', 'Nestler', 1, NULL),
        ('Steve', 'Cook', 5, 1),
        ('Travis', 'Holmes', 2, NULL),
        ('Joshua', 'Abeyta', 3, NULL),
        ('Genesis', 'Gonzalez', 4, NULL),
        ('Jan', 'Rodrigo', 6, NULL),
        ('Kate', 'Yuki', 7, NULL),
        ('Jose', 'Lara', 8, NULL),
        ('Jessica', 'Sanchez', 6, NULL);
