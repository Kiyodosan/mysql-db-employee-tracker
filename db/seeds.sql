INSERT INTO department (name)
VALUES
       ('Board of Directors'),
       ('Public Relations'),
       ('Finance'),
       ('Customer Service');

INSERT INTO role (title, salary)
VALUES
/*        ('CEO', 100000.00),
       ('Vice President', 80000.00),
       ('PR Lead', 45000.00),
       ('PR Coordinator', 30000.00),
       ('Senior Accountant', 50000.00),
       ('Accountant', 35000.00),
       ('Marketing Lead', 60000.00),
       ('Marketing Rep', 40000.00), */
       ('Manager', 32000.00),
       ('Representative', 24000.00);

INSERT INTO employee (first_name, last_name, manager_id)
VALUES
       ('Sam', 'Smith', null),
       ('Danny', 'Devito', null),
       ('Michael', 'Myers', null),
       ('Kim', 'Kardashian', null)
       ('Cindy', 'Crawford', 2),
       ('Bob', 'Barker', 1),
       ('Sally', 'Sue', 3),
       ('John', 'Jenkins', 4),
       ('Peter', 'Parker', 2),
       ('Wendy', 'Wu', 2),
       ('Tom', 'Taylor', 4),
       ('Olly', 'Oxenfree', 3),
       ('Jim', 'Jones', 1),
       ('Andy', 'Anderson', 3),
       ('Ellen', 'Everett', 1),
       ('Frank', 'Fritz', 1),
       ('Gary', 'Gulman', 2);