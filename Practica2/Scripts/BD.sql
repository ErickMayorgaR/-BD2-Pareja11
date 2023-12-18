CREATE DATABASE BD2_PRACTICA2_PAREJA11;

USE BD2_PRACTICA2_PAREJA11;

CREATE TABLE ADMINUSER(
	IdUseradmin INT primary key not null auto_increment,
    username VARCHAR(150),
    pass VARCHAR(50)
);

CREATE TABLE USUARIOS(
	IdUser INT primary key not null auto_increment,
    rol INT,
    username VARCHAR(150),
    pass VARCHAR(50),
    IdUseradmin int,
    FOREIGN KEY (IdUseradmin) REFERENCES ADMINUSER(IdUseradmin)
);

CREATE TABLE PERMISOS (
    IdPermiso INT PRIMARY KEY AUTO_INCREMENT,
    IdUser INT,
    tabla VARCHAR(150),
    permisos VARCHAR(150),
    FOREIGN KEY (IdUser) REFERENCES USUARIOS(IdUser)
);

CREATE TABLE HABITACION (
    IdHabitacion INT PRIMARY KEY AUTO_INCREMENT,
    disponible VARCHAR(10),
    tipo VARCHAR(100)
);

CREATE TABLE PACIENTE (
    IdPaciente INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(150),
    Condicion VARCHAR(200),
    Telefono VARCHAR(50),
    sangre VARCHAR(50),
    IdHabitacion INT,
    FOREIGN KEY (IdHabitacion) REFERENCES HABITACION(IdHabitacion)
);

CREATE TABLE LOG_ACTIVIDAD (
    idLogActividad INT PRIMARY KEY AUTO_INCREMENT,
    actividad VARCHAR(200),
    fecha DATE,
    IdUser INT,
    FOREIGN KEY (IdUser) REFERENCES USUARIOS(IdUser)
);

CREATE TABLE LOG_HABITACION (
    idLogHabitacion INT PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(150),
    enfermedadUltima VARCHAR(50),
    Fecha DATE,
    IdHabitacion INT,
    FOREIGN KEY (IdHabitacion) REFERENCES HABITACION(IdHabitacion)
);