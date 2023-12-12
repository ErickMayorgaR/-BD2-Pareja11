LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Pacientes.csv'
INTO TABLE paciente
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; -- Si el archivo CSV tiene una fila de encabezados, ignórala

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Habitaciones.csv'
INTO TABLE paciente
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; -- Si el archivo CSV tiene una fila de encabezados, ignórala

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LogActividades1.csv'
INTO TABLE paciente
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; -- Si el archivo CSV tiene una fila de encabezados, ignórala

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LogActividades2.csv'
INTO TABLE paciente
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; -- Si el archivo CSV tiene una fila de encabezados, ignórala

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LogHabitacion.csv'
INTO TABLE paciente
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; -- Si el archivo CSV tiene una fila de encabezados, ignórala


GRANT FILE ON *.* TO 'root'@'localhost';
SHOW VARIABLES LIKE "secure_file_priv";




SELECT * FROM paciente;