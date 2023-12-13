-- DIA 3 INCREMENTAL
-- CARGA DE DATOS

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LogHabitacion.csv'
INTO TABLE log_habitacion
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; 

-- CONSULTAS a todas las tablas
SELECT * FROM log_habitacion;
SELECT COUNT(*) FROM log_habitacion;

-- COMANDOS PARA GENERAR BACKUP INCREMENTAL
SHOW binary logs;

flush logs;

purge binary logs before now();


