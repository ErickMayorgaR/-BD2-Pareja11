"use client";

import React, { useState, useEffect } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:4000/loginUsuario", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      console.log(result)

      if (response.status === 200) {
        alert("Usuario logeado con éxito");

        if (result && result.user) {
          sessionStorage.setItem("user", JSON.stringify(result.user));
          console.log(result.user)
        }

        window.location.href = "/session/publicaciones"; // validar la sesion permanente
    } else {
        const error = await response.json();
        alert(error.message);
    }
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
    }
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
          Inicia Sesion en tu Cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900">
              Usuario
            </label>
            <div className="mt-2">
              <input
                id="text"
                name="text"
                type="text"
                autoComplete="text"
                required
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white-900">
                Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}

                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Iniciar Sesion
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          No tienes una cuenta?{' '}
          <a href="/session/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            registrate
          </a>
        </p>
      </div>
    </div>

  );
};

export default Login;
