-- Insertar usuarios de prueba
INSERT INTO users ( user_name, user_email ,first_name, last_name, is_admin)
VALUES
    ('JuanCamaney04','JuanCa@hotmail.com', 'Juan', 'Camaney', true),
    ( 'GermanSalas05', 'German@yahoo.com','German', 'Salas', true),
    ( 'MarcoLucio', 'MarcoL@gmail.com','Marco', 'Lucio', false),
    ( 'HumbertoMtz04', 'HumbertoM@hotmail.com','Humberto', 'Martinez', false),
    ( 'CarlosMtz04', 'CarlosM@hotmail.com','Carlos', 'Martinez', true);



-- Insertar temas de prueba
INSERT INTO topics (topic_name)
VALUES
    ('Matematicas'),
    ('Ciencia'),
    ('Programacion'),
    ('Historia');

-- Insertar cuestionarios de prueba
INSERT INTO quiz (admin_id, topic_id, quiz_name)
VALUES
    ('2', 1, 'Algebra Basica'),
    ('2', 2 ,'Anatomia celular'),
    ('1', 3, 'Independecia Mexicana');


-- Insertar preguntas de prueba


-- Insertar respuestas de prueba
INSERT INTO answer_reports (quiz_id, user_id, analysis) VALUES
    (1, '1', 'LOREM IMPSUM'),
    (2, '3', 'LOREM IMPSUM'),
    (3, '2', 'LOREM IMPSUM');
