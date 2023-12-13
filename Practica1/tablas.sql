CREATE DATABASE practica1_pareaja11;

CREATE TABLE log_actividad (
  timestampx VARCHAR(100) NOT NULL,
  actividad VARCHAR(500) NOT NULL,
  PACIENTE_idPaciente INT NOT NULL,
  HABITACION_IdHabitacion INT NOT NULL,
  FOREIGN KEY (PACIENTE_idPaciente) REFERENCES paciente (idPaciente),
  FOREIGN KEY (HABITACION_IdHabitacion) REFERENCES habitacion (idHabitacion)
);

CREATE TABLE habitacion (
  idHabitacion INT NOT NULL ,
  habitacion VARCHAR(50) NOT NULL,
  PRIMARY KEY (idHabitacion)
);

CREATE TABLE paciente (
  idPaciente INT NOT NULL ,
  edad INT NOT NULL,
  genero VARCHAR(20) NOT NULL,
  PRIMARY KEY (idPaciente)
);

CREATE TABLE log_habitacion (
  timestampx VARCHAR(100) NOT NULL,
  statusx VARCHAR(45) NOT NULL,
  idHabitacion INT NOT NULL,
  PRIMARY KEY (timestampx, idHabitacion),
  FOREIGN KEY (idHabitacion) REFERENCES habitacion (idHabitacion)
);
