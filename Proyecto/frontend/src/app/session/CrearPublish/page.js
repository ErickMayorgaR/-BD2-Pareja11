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
    // Aquí puedes enviar la información del contenido al servidor o realizar la acción que corresponda
    console.log('Contenido de la publicación:', contenido);
    // Puedes realizar una petición POST para enviar la nueva publicación al servidor
    // fetch('URL_DEL_SERVIDOR', {
    //   method: 'POST',
    //   body: JSON.stringify({ contenido }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Manejar la respuesta del servidor si es necesario
    // })
    // .catch(error => console.error(error));
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
