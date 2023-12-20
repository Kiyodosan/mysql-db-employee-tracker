INSERT INTO departments (name)
VALUES ('Board of Directors'),
       ('Public Relations'),
       ('Finance'),
       ('Marketing'),
       ('Customer Service');

INSERT INTO roles (title, salary)
VALUES ('CEO', 100000.00),
       ('Vice President', 80000.00),
       ('PR Lead', 45000.00),
       ('PR Coordinator', 30000.00),
       ('Senior Accountant', 50000.00),
       ('Accountant', 35000.00),
       ('Marketing Lead', 60000.00),
       ('Marketing Rep', 40000.00),
       ('Manager', 32000.00),
       ('Sales Rep', 24000.00);

---- Update this table with manager IDs. Manager ID should be the ID of another employee. 'null' if the employee has no manager
INSERT INTO employees (first_name, last_name, manager_id)
VALUES ('Bob', 'Barker'),
       ('Sally', 'Sue'),
       ('John', 'Jenkins'),
       ('Sam', 'Smith');