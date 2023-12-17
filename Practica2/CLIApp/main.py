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
        username = input("Ingrese el nombre de usuario: ")
        password = input("Ingrese la contraseña: ")
        role = input("Ingrese el rol del usuario: ")
        admin_username = input("Ingrese el nombre de usuario del administrador: ")
        admin_password = input("Ingrese la contraseña del administrador: ")

        if admin_username == Authenticator.admin_user.username and admin_password == Authenticator.admin_user.password:
            new_user = User(username, password, role)
            Logger.log_activity(f"Se ha registrado un nuevo usuario: {username} con rol {role}")
            return new_user
        else:
            Logger.log_activity("Intento fallido de registro de usuario")

    @staticmethod
    def login():
        username = input("Ingrese su nombre de usuario: ")
        password = input("Ingrese su contraseña: ")

        # Lógica para verificar las credenciales y permitir el acceso

    @staticmethod
    def log_in_log_out(username, action):
        Logger.log_activity(f"Usuario {username} ha realizado {action}")

class Menu:
    @staticmethod
    def show_initial_screen():
        # Lógica para mostrar la pantalla inicial

    @staticmethod
    def show_menu():
        # Lógica para mostrar el menú hospital

    @staticmethod
    def show_crud_options():
        # Lógica para CRUD en la base de datos

# Código principal
if __name__ == "__main__":
    while True:
        Menu.show_initial_screen()
        option = input("Ingrese su opción: ")

        if option == "1":
            user = Authenticator.login()
            if user:
                Authenticator.log_in_log_out(user.username, "inicio de sesión")
                Menu.show_menu()
            else:
                Authenticator.log_in_log_out("Desconocido", "intento de inicio de sesión")
        elif option == "2":
            new_user = Authenticator.register_user()
            if new_user:
                Authenticator.log_in_log_out(new_user.username, "registro exitoso")
            else:
                Authenticator.log_in_log_out("Desconocido", "intento de registro")
        elif option == "3":
            # Lógica para salir de la CLI
            break
        else:
            print("Opción inválida. Por favor, seleccione nuevamente.")
