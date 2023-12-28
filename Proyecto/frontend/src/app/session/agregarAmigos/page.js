"use client";
import React, { useState } from 'react';
import Navbar from '../Navbar/page';

const containerStyles = {
  maxWidth: '90%', // Modificado para tener un margen del 5% a cada lado
  margin: '0 auto',
  padding: '20px',
};

const inputStyles = {
  width: '48%', // Modificado para acomodar dos campos en una fila
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
  const [apellido, setApellido] = useState('');
  const [nombre, setNombre] = useState('');

  const handleBuscarClick = () => {
    console.log('Apellido:', apellido);
    console.log('Nombre:', nombre);
    // Aquí podrías realizar alguna acción con los valores de apellido y nombre
  };

  return (
    <>
      <Navbar nombreUsuario="Nombre del Usuario" />
      <div style={containerStyles}>
        <h1 className="text-2xl font-bold text-center mt-4 mb-6">Buscar una persona específica</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ marginRight: '10px', width: '48%' }}>
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              style={inputStyles}
            />
          </div>
          <div style={{ width: '48%' }}>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={inputStyles}
            />
          </div>
        </div>
        <button onClick={handleBuscarClick} style={buttonStyles}>
          Buscar
        </button>
        <h2 className="text-xl font-bold text-center mt-6 mb-4">Sugerencias de amistad</h2>
        {/* Subtítulos y banners de sugerencias de amistad */}
        {/* ... */}
      </div>
      <div className="text-center mt-8 mb-4">
        <h3 className="text-lg font-bold">Amigos de tus amigos</h3>
        {/* Banner "No tenemos amigos para ofrecerte" */}
        {/* ... */}
        <h3 className="text-lg font-bold">En el mismo campo que tú:</h3>
        {/* Banner "Has completado tu perfil? Nadie coincide con tu campo de estudio" */}
        {/* ... */}
      </div>
    </>
  );
};

export default SearchSpecificPerson;
