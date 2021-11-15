INSERT INTO department (name, description)
VALUES
    ('Magician Sales', 'The Magician Sales department deals with sales.'),
    ('Magicianeering', 'The Magicianeering department deals with engineering magic.'),
    ('Shekel Finance', 'The Shekel Finance department deals with finances in the form of shekels.'),
    ('Magic Legal', 'The Magic Legal department deals with magic laws and legality in the world of magic.');

INSERT INTO role (job_title, salary, department_id)
VALUES
    ('Magician Sales Lead', 100000, 1),
    ('Magician Salesperson', 80000, 1),
    ('Lead Magicianeer', 150000, 2),
    ('Software Magicianeer', 120000, 2),
    ('Shekel Accountant', 125000, 3),
    ('Magician Legal Team Lead', 250000, 4),
    ('Magician Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
    ('Benny', 'Vue', 1, 1),
    ('Nkaujlaim', 'Vang', 2, 2),
    ('Boi', 'Thao', 3, null),
    ('Timy', 'Moua', 4, 3),
    ('Kash', 'Lor', 5, null),
    ('Paoshee', 'Thao', 6, null),
    ('Alis', 'Vue', 7, 3),
    ('Allen', 'Master', 4, 1);