-- DIA 4 INCREMENTAL
-- CARGA DE DATOS

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LogActividades1.csv' 
INTO TABLE log_actividad 
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 2 LINES 
(@timestampx, @actividad, @HABITACION_IdHabitacion, @PACIENTE_idPaciente)
SET timestampx = STR_TO_DATE(@timestampx, '%c/%e/%Y %r'), 
    actividad = @actividad, 
    HABITACION_IdHabitacion = @HABITACION_IdHabitacion, 
    PACIENTE_idPaciente = @PACIENTE_idPaciente;

-- CONSULTAS a todas las tablas
SELECT * FROM log_actividad;
SELECT COUNT(*) FROM log_actividad;

-- COMANDOS PARA GENERAR BACKUP INCREMENTAL
SHOW binary logs;

flush logs;

purge binary logs before now();


