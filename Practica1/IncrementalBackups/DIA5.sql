-- DIA 4 INCREMENTAL
-- CARGA DE DATOS

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LogActividades2.csv'
INTO TABLE log_actividad
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES 
(timestampx, actividad, HABITACION_IdHabitacion, PACIENTE_idPaciente);

-- CONSULTAS a todas las tablas
SELECT * FROM log_actividad;
SELECT COUNT(*) FROM log_actividad;

-- COMANDOS PARA GENERAR BACKUP INCREMENTAL
SHOW binary logs;

flush logs;

purge binary logs before now();


