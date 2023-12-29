"use client"

import React, { useState, useEffect } from "react";


const Register = () => {
    const [nombreCompleto, setNombreCompleto] = useState("");

    const [nombreUsuario, setNombreUsuario] = useState("");
    const [foto, setFoto] = useState("");
    const [correo, setCorreo] = useState("");
    const [edad, setEdad] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [contrasena, setContrasena] = useState("");

   
    const onSubmit = async (e) => {
        e.preventDefault();
        const file = foto; 
        // Verificar si se ha seleccionado un archivo
        if (!file) {
            alert("Por favor, selecciona una foto.");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = async () => {
            // Convertir el archivo a Base64
            const base64String = reader.result;
    
            const formData = new FormData();
            formData.append("name", nombreCompleto);
            formData.append("username", nombreUsuario);
            formData.append("correo", correo);
            formData.append("age", edad);
            formData.append("especialidad", especialidad);
            formData.append("password", btoa(contrasena));
            formData.append("foto", base64String); // Agregar la foto en Base64
    
            try {
                const response = await fetch("/api/registrar", {
                    method: "POST",
                    body: formData,
                    // No establecer 'Content-Type' cuando se usa FormData
                });
    
                if (response.status === 200) {
                    alert("Usuario registrado con éxito");
                    window.location.href = "session/login";
                } else {
                    const error = await response.json();
                    alert(error.message);
                }
            } catch (error) {
                alert(error);
            }
        };
    
        // Leer el archivo como una URL de datos (Base64)
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
                    Registrate
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombreUsuario" className="block text-sm font-medium leading-6 text-white-900">
                            Nombre Completo:
                        </label>
                        <input
                            type="text"
                            id="nombreUsuario"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                            value={nombreCompleto}
                            onChange={(e) => setNombreCompleto(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="nombreCompleto" className="block text-sm font-medium leading-6 text-white-900">
                                Nombre Usuario:
                            </label>
                        </div>

                        <div className="mt-2">
                            <input
                                type="text"
                                id="nombreCompleto"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="foto" className="block text-sm font-medium leading-6 text-white-900">
                                Foto:
                            </label>
                        </div>
                        <div className="mt-2">

                            <input
                                type="file"
                                id="foto"
                                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                onChange={(e) => setFoto(e.target.files[0])}

                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="correo" className="block text-sm font-medium leading-6 text-white-900">
                                Correo Electrónico:
                            </label>
                        </div>

                        <div className="mt-2">
                            <input
                                type="email"
                                id="correo"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="edad" className="form-label">
                                Edad:
                            </label>
                        </div>
                        <input
                            type="number"
                            id="edad"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="especialidad" className="block text-sm font-medium leading-6 text-white-900">
                                Especialidad:
                            </label>
                        </div>
                        <input
                            type="text"
                            id="especialidad"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                            value={especialidad}
                            onChange={(e) => setEspecialidad(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="contrasena" className="block text-sm font-medium leading-6 text-white-900">
                                Contraseña:
                            </label>
                        </div>
                        <input
                            type="password"
                            id="contrasena"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            minLength="8"
                            required
                        />
                    </div>

                    <button type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Registrar
                    </button>
                </form >

                <p className="mt-10 text-center text-sm text-gray-500">
          Ya tienes una cuenta?{' '}
          <a href="/session/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Inicia Sesión
          </a>
        </p>
            </div >
        </div >

    );
};

export default Register; 