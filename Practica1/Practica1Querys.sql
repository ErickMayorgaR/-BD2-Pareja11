CREATE DATABASE PRACTICA1_PAREJA11;
show binary logs;
purge binary logs before now();
flush logs;


truncate table log_habitacion;
truncate table log_actividad;

truncate table habitacion;
truncate table paciente;

SET FOREIGN_KEY_CHECKS = 0; 


SET FOREIGN_KEY_CHECKS = 1; 


ALTER TABLE log_actividad DROP PRIMARY KEY;
SHOW CREATE TABLE log_actividad

SELECT * FROM paciente;
SELECT * FROM habitacion;
SELECT * FROM log_habitacion;
SELECT * FROM log_actividad;

SELECT COUNT(*) FROM PACIENTE;
SELECT COUNT(*) FROM habitacion;
SELECT COUNT(*) FROM log_habitacion;
SELECT COUNT(*) FROM log_actividad;




LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Pacientes.csv" 
INTO TABLE paciente
CHARACTER SET 'latin1'
FIELDS terminated by ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(idPaciente, edad, genero);


LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Habitaciones.csv" 
INTO TABLE habitacion
CHARACTER SET 'latin1'
FIELDS terminated by ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(idHabitacion, habitacion);

LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\LogHabitacion.csv" 
INTO TABLE log_habitacion
CHARACTER SET 'latin1'
FIELDS terminated by ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(idHabitacion, timestampx, statusx);

LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\LogActividades1.csv" 
INTO TABLE log_actividad
CHARACTER SET 'latin1'
FIELDS terminated by ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(timestampx, actividad, HABITACION_IdHabitacion, PACIENTE_idPaciente);


LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\LogActividades2.csv" 
INTO TABLE log_actividad
CHARACTER SET 'latin1'
FIELDS terminated by ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(timestampx, actividad, HABITACION_IdHabitacion, PACIENTE_idPaciente);

