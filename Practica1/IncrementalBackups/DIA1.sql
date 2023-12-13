-- DIA 1 INCREMENTAL
-- CARGA DE DATOS

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Pacientes.csv'
INTO TABLE paciente
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; 

-- CONSULTAS a todas las tablas
SELECT * FROM paciente;
SELECT COUNT(*) FROM paciente;

-- COMANDOS PARA GENERAR BACKUP INCREMENTAL
SHOW binary logs;

flush logs;

purge binary logs before now();


