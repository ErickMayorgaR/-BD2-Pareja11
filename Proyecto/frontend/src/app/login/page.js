"use client";

import React, { useState, useEffect } from "react";
import "./Login.css";

const Login = () => {
  const [correo, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      correo,
      password,
    };

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
          "Content-Type":"application/json"
        }
      });

      const result = await response.json();
      // Validando estado de peticion 
      if(result?.codigo === 0){
        const session = {
          tipoUsuario:result.tipoUsuario,
          correo
      };

        sessionStorage.setItem("session", JSON.stringify(session));
        alert("Session Exitosa!!")
        if(result?.tipoUsuario==3){
        }
      }else {
        alert("El correo electrónico o la contraseña no son válidos.");
        sessionStorage.removeItem("session");
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
    <div className="login-container">
    <div className="sub-login-container">

      <h1>Inicio de sesión</h1>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
  
          <input
            type="email"
            id="email"
            name="email"
            class="form-control"
            value={correo}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>


          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
        <p>
          ¿No tienes una cuenta?
          <a href="/register">Registrarse</a>
        </p>
      </form>
    </div>
    </div>

    
  );
};

export default Login;
