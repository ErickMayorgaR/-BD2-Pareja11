SELECT * FROM ADMINUSER;
SELECT * FROM USUARIOS;
SELECT * FROM HABITACION;
SELECT * FROM PERMISOS;
SELECT * FROM PACIENTE;
SELECT * FROM LOG_ACTIVIDAD;
SELECT * FROM LOG_HABITACION;


-- PRUEBAS PARA REGISTRO

 CALL InsertarUsuario('prueba2','prueba3', 1 ,'admin','admin','s');
 CALL InsertarUsuario('prueba3','prueba3', 1 ,'admin','admin','s');


-- PRUEBAS PARA LOGIN
 CALL LoginUsuario('prueba2','prueba3');
 
 
-- INSERTS PARA HABITACIONES
-- Scripts de inserción para la tabla HABITACION
INSERT INTO HABITACION (disponible, tipo) VALUES ('Sí', 'Individual');
INSERT INTO HABITACION (disponible, tipo) VALUES ('Sí', 'Doble');
INSERT INTO HABITACION (disponible, tipo) VALUES ('No', 'Suite');
INSERT INTO HABITACION (disponible, tipo) VALUES ('Sí', 'Individual');
INSERT INTO HABITACION (disponible, tipo) VALUES ('No', 'Doble');
INSERT INTO HABITACION (disponible, tipo) VALUES ('Sí', 'Suite');
INSERT INTO HABITACION (disponible, tipo) VALUES ('Sí', 'Individual');
INSERT INTO HABITACION (disponible, tipo) VALUES ('No', 'Doble');
INSERT INTO HABITACION (disponible, tipo) VALUES ('No', 'Suite');
INSERT INTO HABITACION (disponible, tipo) VALUES ('Sí', 'Individual');


-- INSERTS PARA PACIENTES
-- Scripts de inserción para la tabla PACIENTE
INSERT INTO PACIENTE (Nombre, Condicion, Telefono, sangre, IdHabitacion) VALUES ('Juan Pérez', 'Fractura de pierna', '123456789', 'A+', 1);
INSERT INTO PACIENTE (Nombre, Condicion, Telefono, sangre, IdHabitacion) VALUES ('María García', 'Neumonía', '987654321', 'AB-', 2);
INSERT INTO PACIENTE (Nombre, Condicion, Telefono, sangre, IdHabitacion) VALUES ('Luis Rodríguez', 'Asma', '456123789', 'O+', 3);
INSERT INTO PACIENTE (Nombre, Condicion, Telefono, sangre, IdHabitacion) VALUES ('Ana Martínez', 'Dolor de espalda', '789456123', 'B-', 4);
INSERT INTO PACIENTE (Nombre, Condicion, Telefono, sangre, IdHabitacion) VALUES ('Carlos Sánchez', 'Gastritis', '321654987', 'A-', 5);
INSERT INTO PACIENTE (Nombre, Condicion, Telefono, sangre, IdHabitacion) VALUES ('Sofía López', 'Migraña', '654987321', 'AB+', 6);
INSERT INTO PACIENTE (Nombre, Condicion, Telefono, sangre, IdHabitacion) VALUES ('David González', 'Alergia', '147258369', 'O-', 7);
INSERT INTO PACIENTE (Nombre, Condicion, Telefono, sangre, IdHabitacion) VALUES ('Elena Ramírez', 'Quemadura', '369147258', 'B+', 8);
INSERT INTO PACIENTE (Nombre, Condicion, Telefono, sangre, IdHabitacion) VALUES ('Pedro Fernández', 'Hipertensión', '258369147', 'A+', 9);
INSERT INTO PACIENTE (Nombre, Condicion, Telefono, sangre, IdHabitacion) VALUES ('Laura Torres', 'Diabetes', '963852741', 'O-', 10);


-- INSERTS PARA LOG HABITACION
-- Scripts de inserción para la tabla LOG_HABITACION
INSERT INTO LOG_HABITACION (estado, enfermedadUltima, Fecha, IdHabitacion) VALUES ('Ocupada', 'Resfriado', '2023-01-01', 1);
INSERT INTO LOG_HABITACION (estado, enfermedadUltima, Fecha, IdHabitacion) VALUES ('Libre', NULL, '2023-01-02', 2);
INSERT INTO LOG_HABITACION (estado, enfermedadUltima, Fecha, IdHabitacion) VALUES ('Ocupada', 'Dolor de cabeza', '2023-01-03', 3);
INSERT INTO LOG_HABITACION (estado, enfermedadUltima, Fecha, IdHabitacion) VALUES ('Libre', NULL, '2023-01-04', 4);
INSERT INTO LOG_HABITACION (estado, enfermedadUltima, Fecha, IdHabitacion) VALUES ('Ocupada', 'Fiebre', '2023-01-05', 5);
INSERT INTO LOG_HABITACION (estado, enfermedadUltima, Fecha, IdHabitacion) VALUES ('Libre', NULL, '2023-01-06', 6);
INSERT INTO LOG_HABITACION (estado, enfermedadUltima, Fecha, IdHabitacion) VALUES ('Ocupada', 'Gripe', '2023-01-07', 7);
INSERT INTO LOG_HABITACION (estado, enfermedadUltima, Fecha, IdHabitacion) VALUES ('Libre', NULL, '2023-01-08', 8);
INSERT INTO LOG_HABITACION (estado, enfermedadUltima, Fecha, IdHabitacion) VALUES ('Ocupada', 'Esguince', '2023-01-09', 9);
INSERT INTO LOG_HABITACION (estado, enfermedadUltima, Fecha, IdHabitacion) VALUES ('Libre', NULL, '2023-01-10', 10);
