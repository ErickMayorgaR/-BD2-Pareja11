"use client";

import React, { useState } from 'react';
import Navbar from '../Navbar/page';

// Estilos en línea para Container
const containerStyles = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
};

// Estilos en línea para el textarea y el botón
const inputStyles = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  marginBottom: '20px',
  color: 'black'
};

const buttonStyles = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};


const CrearPublicacion = () => {
  const [contenido, setContenido] = useState('');

  const handleCrearPublicacion = () => {
    var usuario = "Juan Mecanico default"; // Usuario quemado
    // Realizar la solicitud GET al servidor
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      //console.log(user)
      usuario = user.name
    }
    console.log(usuario)
    fetch('http://localhost:4000/crearPublicacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ autor: usuario, contenido }),
    })
      .then((response) => {
        if (response.ok) {
          alert('Publicación creada con éxito');
        } else {
          throw new Error('Error al crear publicación');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error al crear publicación');
      });
  };

  return (
    <>
      <Navbar nombreUsuario="Nombre del Usuario" />
      <div style={containerStyles}>
        <h1 className="text-2xl font-bold text-center mt-4 mb-6">AÑADIR UNA PUBLICACIÓN</h1>
        <textarea
          placeholder="Escribe tu publicación aquí..."
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          style={inputStyles}
        />
        <button onClick={handleCrearPublicacion} style={buttonStyles}>
          Crear
        </button>
      </div>
    </>
  );
};

export default CrearPublicacion;