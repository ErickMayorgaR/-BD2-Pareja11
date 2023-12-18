import mysql.connector

class User:
    def __init__(self, username, password, role):
        self.username = username
        self.password = password
        self.role = role

class Logger:
    @staticmethod
    def log_activity(activity):
        # Lógica para registrar actividades en la bitácora
        print(f"Logging: {activity}")

class Authenticator:
    admin_user = User("admin", "adminpass", "admin")

    @staticmethod
    def register_user():
        print(f"***** REGISTRO DE NUEVO USUARIO *****")
        username = input("Ingrese el nombre de usuario: ")
        password = input("Ingrese la contraseña: ")
        role = input("Ingrese el rol del usuario: ")
        admin_username = input("Ingrese el nombre de usuario del administrador: ")
        admin_password = input("Ingrese la contraseña del administrador: ")
        confirmacion = input("REGISTRAR NUEVO USUARIO?: SI (s), NO (n)")

        try:
            cursor = Menu.db_connection.cursor()
            cursor.callproc('InsertarUsuario', (username, password, role, admin_username, admin_password, confirmacion))
            Menu.db_connection.commit()
            Logger.log_activity(f"Se ha registrado un nuevo usuario: {username} con rol {role}")
            cursor.close() 
            new_user = User(username, password, role)
            return new_user
        except mysql.connector.Error as error:
            Logger.log_activity("Error al intentar registrar un nuevo usuario: " + str(error))

    @staticmethod
    def login():
        print(f"***** INICIO DE SESION *****")
        username = input("Ingrese su nombre de usuario: ")
        password = input("Ingrese su contraseña: ")
        query = "CALL LoginUsuario('{}', '{}')".format(username, password)  # Query con datos escapados
        cursor = Menu.db_connection.cursor()

        try:
            cursor.execute(query)
            results = cursor.fetchall()

            if results:  # Si se encontraron resultados
                user_data = results[0]  # Obtener el primer resultado, asumiendo que es el usuario
                
                # Crear un nuevo objeto de usuario con los datos devueltos por el procedimiento almacenado
                new_user = User(user_data[1], user_data[2], user_data[3])  # Crear el usuario con los datos recuperados
                
                Logger.log_activity(f"Ha iniciado sesión el usuario: {username}")
                cursor.close()

                return new_user  # Devolver el usuario autenticado
            else:
                Logger.log_activity(f"No se encontraron resultados para el usuario: {username}")
                cursor.close()
                return None  # Si no se encontraron resultados, devuelve None

        except Exception as e:
            print("Error:", e)  # Manejo de errores en caso de problemas con la ejecución de la consulta
            cursor.close()
            return None  # Devolver None en caso de error

    @staticmethod
    def log_in_log_out(username, action):
        Logger.log_activity(f"Usuario {username} ha realizado {action}")

class Menu:
    db_connection = None
    
    @staticmethod
    def connect_to_db():
        try:
            Menu.db_connection = mysql.connector.connect(
                host="localhost",
                user="root",
                password="Mario.crv208",
                database="BD2_PRACTICA2_PAREJA11"
            )
            print("Conexión a la base de datos exitosa.")
        except mysql.connector.Error as err:
            print(f"Error al conectar a la base de datos: {err}")
            
    @staticmethod
    def test_db_connection():
        if Menu.db_connection.is_connected():
            print("¡Conexión a la base de datos establecida!")
        else:
            print("No hay conexión a la base de datos.")
            
    @staticmethod
    def show_initial_screen():
        print(f"***** CLI HOSPITAL BIENVENIDO *****")
        print(f"1. INICIAR SESION")
        print(f"2. REGISTRAR UN NUEVO USUARIO")
        print(f"3. SALIR")
        print("4. TEST CONEXIÓN DB")
        # Lógica para mostrar la pantalla inicial
        pass

    @staticmethod
    def show_menu(user):
        print(f"***** BIENVENIDO USUARIO: {user.username} con rol {user.role} *****")
        print(f"MENU:")
        print(f"1. CONSULTAS")
        print(f"2. ACTUALIZAR REGISTROS")
        print(f"3. AGREGAR REGISTROS")
        print(f"4. ELIMINAR REGISTROS")
        print(f"5. REALIZAR RESPALDO COMPLETO")
        print(f"6. VER RESPALDOS REALIZADOS")
        print(f"7. RESTAURAR RESPALDO")
        option = input("Ingrese su opción: ")
        if option == "1":
            if user.role == 1:
                try:
                    cursor = Menu.db_connection.cursor()
                    cursor.execute("SELECT * FROM HABITACION ORDER BY IdHabitacion DESC LIMIT 50;")
                    results = cursor.fetchall()
                    print("HABITACIONES-----------------------------------------------")
                    for row in results:
                        # Convertir cada elemento de la tupla a cadena antes de imprimirlos
                        row_str = ' '.join(map(str, row))
                        print("habitacion:", row_str)
                    cursor = Menu.db_connection.cursor()
                    cursor.execute("SELECT * FROM PACIENTE ORDER BY IdPaciente DESC LIMIT 50;")
                    results = cursor.fetchall()
                    print("PACIENTES--------------------------------------------------")
                    for row in results:
                        print("paciente: "+ row)
                    cursor = Menu.db_connection.cursor()
                    cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('Doctor realiza una consulta', NOW(), 1);")
                    Menu.db_connection.commit() 
                except Exception as e:
                    print("Error:", e)  # Manejo de errores en caso de problemas con la ejecución de la consulta
                    cursor.close()
            elif user.role == 2:
                try:
                    cursor = Menu.db_connection.cursor()
                    cursor.execute("SELECT * FROM PACIENTE ORDER BY IdPaciente DESC LIMIT 50;")
                    results = cursor.fetchall()
                    print("PACIENTES--------------------------------------------------")
                    for row in results:
                        # Convertir cada elemento de la tupla a cadena antes de imprimirlos
                        row_str = ' '.join(map(str, row))
                        print("paciente:", row_str)
                    cursor = Menu.db_connection.cursor()
                    cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('Doctor realiza una consulta', NOW(), 1);")
                    Menu.db_connection.commit() 
                except Exception as e:
                    print("Error:", e)  # Manejo de errores en caso de problemas con la ejecución de la consulta
                    cursor.close()
            elif user.role == 3:
                try:
                    cursor = Menu.db_connection.cursor()
                    cursor.execute("SELECT * FROM LOG_ACTIVIDAD ORDER BY idLogActividad DESC LIMIT 50;")
                    results = cursor.fetchall()
                    print("LOGS_ACTIVIDADES--------------------------------------------")
                    for row in results:
                        # Convertir cada elemento de la tupla a cadena antes de imprimirlos
                        row_str = ' '.join(map(str, row))
                        print("log actividad:", row_str)
                    cursor.execute("SELECT * FROM LOG_HABITACION ORDER BY idLogHabitacion DESC LIMIT 50;")
                    results = cursor.fetchall()
                    print("LOGS_HABITACIONES-------------------------------------------")
                    for row in results:
                        # Convertir cada elemento de la tupla a cadena antes de imprimirlos
                        row_str = ' '.join(map(str, row))
                        print("log actividad:", row_str)
                    cursor = Menu.db_connection.cursor()
                    cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('Doctor realiza una consulta', NOW(), 1);")
                    Menu.db_connection.commit() 
                except Exception as e:
                    print("Error:", e)  # Manejo de errores en caso de problemas con la ejecución de la consulta
                    cursor.close()
            elif user.role == 4:
                try:
                    cursor = Menu.db_connection.cursor()
                    cursor.execute("SELECT * FROM LOG_ACTIVIDAD ORDER BY idLogActividad DESC LIMIT 50;")
                    results = cursor.fetchall()
                    print("LOGS_ACTIVIDADES--------------------------------------------")
                    for row in results:
                        # Convertir cada elemento de la tupla a cadena antes de imprimirlos
                        row_str = ' '.join(map(str, row))
                        print("log actividad:", row_str)
                    cursor = Menu.db_connection.cursor()
                    cursor.execute("SELECT * FROM LOG_HABITACION ORDER BY idLogHabitacion DESC LIMIT 50;")
                    results = cursor.fetchall()
                    print("LOGS_HABITACIONES-------------------------------------------")
                    for row in results:
                        # Convertir cada elemento de la tupla a cadena antes de imprimirlos
                        row_str = ' '.join(map(str, row))
                        print("log habitacion:", row_str)
                    cursor = Menu.db_connection.cursor()
                    cursor.execute("SELECT * FROM HABITACION ORDER BY IdHabitacion DESC LIMIT 50;")
                    results = cursor.fetchall()
                    print("HABITACIONES-----------------------------------------------")
                    for row in results:
                        # Convertir cada elemento de la tupla a cadena antes de imprimirlos
                        row_str = ' '.join(map(str, row))
                        print("habitacion:", row_str)
                    cursor = Menu.db_connection.cursor()
                    cursor.execute("SELECT * FROM PACIENTE ORDER BY IdPaciente DESC LIMIT 50;")
                    results = cursor.fetchall()
                    print("PACIENTES--------------------------------------------------")
                    for row in results:
                        # Convertir cada elemento de la tupla a cadena antes de imprimirlos
                        row_str = ' '.join(map(str, row))
                        print("paciente:", row_str)
                    cursor = Menu.db_connection.cursor()
                    cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('Doctor realiza una consulta', NOW(), 1);")
                    Menu.db_connection.commit() 
                except Exception as e:
                    print("Error:", e)  # Manejo de errores en caso de problemas con la ejecución de la consulta
                    cursor.close()
                
        elif option == "2":
            if user.role == 1:
                print(f"No se implemento el update")
                cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('No se implemento', NOW(), 1);")
                Menu.db_connection.commit() 
            elif user.role == 2:
                print(f"NO TIENE PERMISOS PARA REALIZAR ESTA ACCION")
                cursor = Menu.db_connection.cursor()
                cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('usuario no tiene permiso para update', NOW(), 1);")
                Menu.db_connection.commit() 
            elif user.role == 3:
                print(f"No se implemento el update")
                cursor = Menu.db_connection.cursor()
                cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('No se implemento', NOW(), 1);")
                Menu.db_connection.commit() 
            elif user.role == 4:
                print(f"No se implemento el update")
                cursor = Menu.db_connection.cursor()
                cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('No se implemento', NOW(), 1);")
                Menu.db_connection.commit() 
        elif option == "3":
            if user.role == 1:
                print(f"NO TIENE PERMISOS PARA REALIZAR ESTA ACCION")
                cursor = Menu.db_connection.cursor()
                cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('usuario no tiene permiso para insert', NOW(), 1);")
                Menu.db_connection.commit() 
            elif user.role == 2:
                print(f"NO TIENE PERMISOS PARA REALIZAR ESTA ACCION")
                cursor = Menu.db_connection.cursor()
                cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('usuario no tiene permiso para insert', NOW(), 1);")
                Menu.db_connection.commit() 
            elif user.role == 3:
                print(f"No se implemento el insert")
                cursor = Menu.db_connection.cursor()
                cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('No se implemento', NOW(), 1);")
                Menu.db_connection.commit() 
            elif user.role == 4:
                print(f"No se implemento el insert")
                cursor = Menu.db_connection.cursor()
                cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('No se implemento', NOW(), 1);")
                Menu.db_connection.commit() 
        elif option == "4":
            if user.role == 1:
                print(f"NO TIENE PERMISOS PARA REALIZAR ESTA ACCION")
                cursor = Menu.db_connection.cursor()
                cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('usuario no tiene permiso para delete', NOW(), 1);")
                Menu.db_connection.commit() 
            elif user.role == 2:
                print(f"NO TIENE PERMISOS PARA REALIZAR ESTA ACCION")
                cursor = Menu.db_connection.cursor()
                cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('usuario no tiene permiso para delete', NOW(), 1);")
                Menu.db_connection.commit() 
            elif user.role == 3:
                print(f"NO TIENE PERMISOS PARA REALIZAR ESTA ACCION")
                cursor = Menu.db_connection.cursor()
                cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('usuario no tiene permiso para delete', NOW(), 1);")
                Menu.db_connection.commit() 
            elif user.role == 4:
                print(f"No se implemento el delete")
            cursor = Menu.db_connection.cursor()
            cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('No se implemento', NOW(), 1);")
            Menu.db_connection.commit() 
        elif option == "5":
            print(f"La opcion seleccionada esta funcion")
            cursor = Menu.db_connection.cursor()
            cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('No se implemento', NOW(), 1);")
            Menu.db_connection.commit() 
        elif option == "6":
            print(f"La opcion seleccionada esta funcion")
            cursor = Menu.db_connection.cursor()
            cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('No se implemento', NOW(), 1);")
            Menu.db_connection.commit() 
        elif option == "7":
            print(f"La opcion seleccionada esta funcion")
            cursor = Menu.db_connection.cursor()
            cursor.execute("INSERT INTO LOG_ACTIVIDAD (actividad, fecha, IdUser) VALUES ('No se implemento', NOW(), 1);")
            Menu.db_connection.commit() 
        else:
            print(f"La opcion seleccionada no existe")
            Menu.show_menu(user)
            
            
        # Lógica para mostrar el menú hospital
        
        
        pass

# Código principal
if __name__ == "__main__":
    while True:
        Menu.show_initial_screen()
        option = input("Ingrese su opción: ")

        if option == "1":
            Menu.connect_to_db()
            user = Authenticator.login()
            if user:
                Authenticator.log_in_log_out(user.username, "inicio de sesión")
                Menu.connect_to_db()
                Menu.show_menu(user)
            else:
                Authenticator.log_in_log_out("Desconocido", "intento de inicio de sesión")
        elif option == "2":
            # Antes de llamar a Authenticator.register_user(), establecemos la conexión a la base de datos
            Menu.connect_to_db()
            new_user_data = Authenticator.register_user()
            print(new_user_data)
            Authenticator.log_in_log_out(new_user_data.username, "registro exitoso")
        elif option == "3":
            print(f"HASTA LA PROXIMA :D")
            # Lógica para salir de la CLI
            break
        elif option == "4":  # Nueva opción para probar la conexión a la BD
            Menu.connect_to_db()
            Menu.test_db_connection()
        else:
            print("Opción inválida. Por favor, seleccione nuevamente.")

