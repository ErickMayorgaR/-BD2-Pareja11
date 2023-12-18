DELIMITER //

CREATE TRIGGER asignar_permisos
AFTER INSERT ON USUARIOS
FOR EACH ROW
BEGIN
    DECLARE rol_usuario VARCHAR(50);
    
    -- Obtener el rol del usuario insertado
    SELECT rol INTO rol_usuario FROM USUARIOS WHERE IdUser = NEW.IdUser;
    
    -- Asignar permisos según el rol
    IF rol_usuario = 1 THEN
        INSERT INTO PERMISOS (IdUser, tabla, permisos)
        VALUES (NEW.IdUser, 'habitación', 'SELECT'),
               (NEW.IdUser, 'paciente', 'SELECT, UPDATE');
    ELSEIF rol_usuario = 2 THEN
        INSERT INTO PERMISOS (IdUser, tabla, permisos)
        VALUES (NEW.IdUser, 'paciente', 'SELECT');
    ELSEIF rol_usuario = 3 THEN
        INSERT INTO PERMISOS (IdUser, tabla, permisos)
        VALUES (NEW.IdUser, 'log_actividad', 'SELECT, UPDATE, INSERT'),
               (NEW.IdUser, 'log_habitacion', 'SELECT, UPDATE, INSERT');
    ELSE
        -- Asignar todos los permisos al usuario administrador
        INSERT INTO PERMISOS (IdUser, tabla, permisos)
        VALUES (NEW.IdUser, 'habitación', 'SELECT, INSERT, UPDATE, DELETE'),
               (NEW.IdUser, 'paciente', 'SELECT, INSERT, UPDATE, DELETE'),
               (NEW.IdUser, 'log_actividad', 'SELECT, INSERT, UPDATE, DELETE'),
               (NEW.IdUser, 'log_habitacion', 'SELECT, INSERT, UPDATE, DELETE');
    END IF;
END//

DELIMITER ;


INSERT INTO ADMINUSER (username, pass) VALUES ('Mario', 'Mario1234');
INSERT INTO ADMINUSER (username, pass) VALUES ('admin', 'admin');

