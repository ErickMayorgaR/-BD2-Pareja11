CREATE DATABASE PRACTICA1_PAREJA11;

USE PRACTICA1_PAREJA11;

CREATE TABLE habitacion (
  idHabitacion INT NOT NULL AUTO_INCREMENT,
  habitacion VARCHAR(50) NOT NULL,
  PRIMARY KEY (idHabitacion)
);

CREATE TABLE paciente (
  idPaciente INT NOT NULL AUTO_INCREMENT,
  edad INT NOT NULL,
  genero VARCHAR(20) NOT NULL,
  PRIMARY KEY (idPaciente)
);

CREATE TABLE log_actividad (
  id_log_actividad INT NOT NULL AUTO_INCREMENT,
  timestampx VARCHAR(100) NOT NULL,
  actividad VARCHAR(500) NOT NULL,
  PACIENTE_idPaciente INT NOT NULL,
  HABITACION_IdHabitacion INT NOT NULL,
  PRIMARY KEY (id_log_actividad),
  FOREIGN KEY (PACIENTE_idPaciente) REFERENCES paciente (idPaciente),
  FOREIGN KEY (HABITACION_IdHabitacion) REFERENCES habitacion (idHabitacion)
);

CREATE TABLE log_habitacion (
  timestampx VARCHAR(100) NOT NULL,
  statusx VARCHAR(45) NOT NULL,
  idHabitacion INT NOT NULL,
  PRIMARY KEY (timestampx, idHabitacion),
  FOREIGN KEY (idHabitacion) REFERENCES habitacion (idHabitacion)
);