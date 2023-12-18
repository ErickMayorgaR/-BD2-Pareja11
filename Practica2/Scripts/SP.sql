-- STORE PROCEDURES

-- 1. Insertar Usuario con Validación y Registro en Log_Actividad
DELIMITER //

CREATE PROCEDURE InsertarUsuario(
    IN nuevo_username VARCHAR(150),
    IN nuevo_pass VARCHAR(50),
    IN nuevo_rol INT,
    IN admin_username VARCHAR(150),
    IN admin_pass VARCHAR(50),
    IN extra CHAR(1)
)
BEGIN
    DECLARE admin_id INT;
    DECLARE admin_exists INT;
    DECLARE user_exists INT;
    
    -- Verificar si el usuario administrador existe
    SELECT IdUseradmin INTO admin_id FROM ADMINUSER WHERE username = admin_username AND pass = admin_pass;
    SELECT COUNT(*) INTO admin_exists FROM ADMINUSER WHERE IdUseradmin = admin_id;
    
    IF admin_exists = 1 THEN
        -- Verificar si el usuario a insertar ya existe
        SELECT COUNT(*) INTO user_exists FROM USUARIOS WHERE username = nuevo_username;
        
        IF user_exists = 0 THEN
            -- Validar el rol y realizar la inserción
            IF nuevo_rol IN (1, 2, 3) THEN
                INSERT INTO USUARIOS (rol, username, pass, IdUseradmin) VALUES (nuevo_rol, nuevo_username, nuevo_pass, admin_id);
                
                IF extra = 's' THEN
                    INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('Creación de usuario', NOW(), admin_id);
                END IF;
            ELSE
                IF extra = 's' THEN
                    INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('Intento fallido de creación de usuario', NOW(), admin_id);
                END IF;
            END IF;
        ELSE
            IF extra = 's' THEN
                INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('Intento fallido de creación de usuario - Usuario existente', NOW(), admin_id);
            END IF;
        END IF;
    ELSE
        IF extra = 's' THEN
            INSERT INTO LOG_ACTIVIDAD (actividad, fecha) VALUES ('Intento fallido de creación de usuario - Usuario administrador no válido', NOW());
        END IF;
    END IF;
END//

DELIMITER ;



-- 2. Función de Login con Registro en Log_Actividad
DELIMITER //

CREATE PROCEDURE LoginUsuario(
    IN user_username VARCHAR(150),
    IN user_pass VARCHAR(50)
)
BEGIN
    DECLARE user_id INT;
    DECLARE found_user INT DEFAULT 0;

    -- Eliminar la tabla si existe para evitar errores previos
    DROP TABLE IF EXISTS login_results;
    
    -- Crear una tabla permanente para almacenar los resultados
    CREATE TABLE login_results (
        IdUser INT,
        username VARCHAR(150),
        pass VARCHAR(50),
        rol INT
    );

    -- Verificar si el usuario existe en USUARIOS
    SELECT IdUser INTO user_id FROM USUARIOS WHERE username = user_username AND pass = user_pass;
    
    IF user_id IS NOT NULL THEN
        -- Almacenar los resultados del usuario encontrado en la tabla permanente
        INSERT INTO login_results (IdUser, username, pass, rol)
        SELECT IdUser, username, pass, rol FROM USUARIOS WHERE IdUser = user_id;
        
        SET found_user = 1;

        -- Registrar inicio de sesión exitoso
        INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('Inicio de sesión exitoso', NOW(), user_id);
    ELSE
        -- Verificar si el usuario existe en ADMINUSER
        SELECT IdUseradmin INTO user_id FROM ADMINUSER WHERE username = user_username AND pass = user_pass;
        
        IF user_id IS NOT NULL THEN
            -- Almacenar los resultados del usuario administrador encontrado en la tabla permanente
            INSERT INTO login_results (IdUser, username, pass, rol)
            SELECT IdUseradmin AS IdUser, username, pass, 'admin' AS rol FROM ADMINUSER WHERE IdUseradmin = user_id;
            
            SET found_user = 1;

            -- Registrar inicio de sesión exitoso como administrador
            INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('Inicio de sesión exitoso como administrador', NOW(), user_id);
        ELSE
            -- Registrar intento fallido de inicio de sesión
            INSERT INTO LOG_ACTIVIDAD (actividad, fecha) VALUES ('Intento fallido de inicio de sesión', NOW());
        END IF;
    END IF;

    -- Devolver resultados si se encontró un usuario
    IF found_user = 1 THEN
        SELECT * FROM login_results;
    END IF;
    
    -- Eliminar la tabla después de obtener los resultados
    DROP TABLE IF EXISTS login_results;
END//

DELIMITER ;





-- 3. Consulta de Últimos 50 Registros de Pacientes con Registro en Log_Actividad
DELIMITER //

CREATE PROCEDURE ConsultarUltimosLogsActividad()
BEGIN
    SELECT * FROM LOG_ACTIVIDAD ORDER BY idLogActividad DESC LIMIT 50;
    
    INSERT INTO LOG_ACTIVIDAD (actividad, fecha) VALUES ('Consulta de últimos 50 registros de log de actividad', NOW());
END//

DELIMITER ;






-- 4. Consultar Últimos 50 Registros de Pacientes
DELIMITER //

CREATE PROCEDURE ConsultarUltimosPacientes()
BEGIN
    SELECT * FROM PACIENTE ORDER BY IdPaciente DESC LIMIT 50;
    
    INSERT INTO LOG_ACTIVIDAD (actividad, fecha) VALUES ('Consulta de últimos 50 pacientes', NOW());
END//

DELIMITER ;





-- 5. Consultar Últimos 50 Registros de Habitaciones
DELIMITER //

CREATE PROCEDURE ConsultarUltimasHabitaciones()
BEGIN
    SELECT * FROM HABITACION ORDER BY IdHabitacion DESC LIMIT 50;
    
    INSERT INTO LOG_ACTIVIDAD (actividad, fecha) VALUES ('Consulta de últimos 50 habitaciones', NOW());
END//

DELIMITER ;






-- 6. Consultar Últimos 50 Registros de Log_Habitacion
DELIMITER //

CREATE PROCEDURE ConsultarUltimosLogsHabitacion()
BEGIN
    SELECT * FROM LOG_HABITACION ORDER BY idLogHabitacion DESC LIMIT 50;
    
    INSERT INTO LOG_ACTIVIDAD (actividad, fecha) VALUES ('Consulta de últimos 50 registros de log de habitación', NOW());
END//

DELIMITER ;





-- 7. Insercion a log_actividad
DELIMITER //

CREATE PROCEDURE InsertarLogActividad(
    IN mensaje VARCHAR(200)
)
BEGIN
    INSERT INTO log_actividad (actividad, fecha) VALUES (mensaje, NOW());
END;

DELIMITER ;