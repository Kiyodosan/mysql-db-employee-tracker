INSERT INTO department (name)
VALUES
       ('Board of Directors'),
       ('Public Relations'),
       ('Finance'),
       ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES
       ('Manager', 32000.00, 1),
       ('Representative', 24000.00, 1),
       ('Manager', 32000.00, 2),
       ('Representative', 24000.00, 2),
       ('Manager', 32000.00, 3),
       ('Representative', 24000.00, 3),
       ('Manager', 32000.00, 4),
       ('Representative', 24000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
       ('Sam', 'Smith', 5, null),
       ('Danny', 'Devito', 1, null),
       ('Michael', 'Myers', 7, null),
       ('Kim', 'Kardashian', 3, null),
       ('Cindy', 'Crawford', 2, 2),
       ('Bob', 'Barker', 6, 1),
       ('Sally', 'Sue', 8, 3),
       ('John', 'Jenkins', 4, 4),
       ('Peter', 'Parker', 2, 2),
       ('Wendy', 'Wu', 2, 2),
       ('Tom', 'Taylor', 4, 4),
       ('Olly', 'Oxenfree', 8, 3),
       ('Jim', 'Jones', 6, 1),
       ('Andy', 'Anderson', 8, 3),
       ('Ellen', 'Everett', 6, 1),
       ('Frank', 'Fritz', 6, 1),
       ('Gary', 'Gulman', 2, 2);