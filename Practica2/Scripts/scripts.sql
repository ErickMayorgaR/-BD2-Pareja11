SELECT * FROM ADMINUSER;
SELECT * FROM USUARIOS;
SELECT * FROM HABITACION;
SELECT * FROM PERMISOS;
SELECT * FROM PACIENTE;
SELECT * FROM LOG_ACTIVIDAD;
SELECT * FROM LOG_HABITACION;


-- PRUEBAS PARA REGISTRO

 CALL InsertarUsuario('prueba2','prueba3', 1 ,'admin','admin','s');
 CALL InsertarUsuario('prueba3','prueba3', 1 ,'admin','admin','s');


-- PRUEBAS PARA LOGIN
 CALL LoginUsuario('prueba2','prueba3');
 
 

