"use client";
import React, { useState } from 'react';
import Navbar from '../Navbar/page';

const containerStyles = {
  maxWidth: '90%',
  margin: '0 auto',
  padding: '20px',
};

const inputStyles = {
  width: '48%',
  padding: '10px',
  fontSize: '16px',
  marginBottom: '20px',
  color: 'black',
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

const SearchSpecificPerson = () => {
  const [nombre, setNombre] = useState('');

  const handleBuscarClick = async () => {
    try {
      // Realizar la solicitud GET al servidor
      var usuario = "Juan Pérez López"; // Usuario quemado
      const userData = sessionStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        //console.log(user)
        usuario = user.name
      }
      const response = await fetch('http://localhost:4000/agregarAmigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: usuario,
          acceptedFriendName: nombre,
        }),
      });

      if (response.ok) {
        alert('Amigo agregado exitosamente');
      } else {
        alert('Amigo no encontrado');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Ocurrió un error al agregar el amigo');
    }
  };

  return (
    <>
      <Navbar nombreUsuario="Nombre del Usuario" />
      <div style={containerStyles}>
        <h1 className="text-2xl font-bold text-center mt-4 mb-6">Buscar una persona específica</h1>
        <div style={{ width: '100%' }}>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={inputStyles}
          />
        </div>
        <button onClick={handleBuscarClick} style={buttonStyles}>
          Buscar
        </button>
        {/* Resto del contenido */}
      </div>
    </>
  );
};

export default SearchSpecificPerson;
