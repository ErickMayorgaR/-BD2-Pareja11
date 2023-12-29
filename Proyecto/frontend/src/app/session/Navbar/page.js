"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = ({ nombreUsuario = 'Usuario' }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navbarStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  };

  const menuStyles = {
    display: menuVisible ? 'block' : 'none',
    position: 'absolute',
    top: '50px', // Adjust this value to position the menu as needed
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    zIndex: 1,
  };

  const separatorStyles = {
    width: '100%',
    borderBottom: '1px solid #ccc',
    margin: '10px 0',
  };

  const buttonStyles = {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    padding: '5px',
    outline: 'none',
  };

  const linkStyles = {
    textDecoration: 'none',
    color: '#007bff',
    margin: '5px 0',
  };

  return (
    <div style={navbarStyles}>
      {/* Botón para desplegar el menú */}
      <button onClick={toggleMenu} style={buttonStyles, {backgroundColor: 'red'}}>
        {/* Título del usuario */}
        <h2>{"Opciones para " + nombreUsuario}</h2>
      </button>

      {/* Menú desplegable */}
      <div style={menuStyles}>
        {/* Opciones de redirección */}
        <Link href="/session/publicaciones">
          <p style={linkStyles}>Publicaciones</p>
        </Link>
        <Link href="/session/Perfil">
          <p style={linkStyles}>Perfil</p>
        </Link>
        <Link href="/session/MisAmigos">
          <p style={linkStyles}>Amigos</p>
        </Link>
        <Link href="/session/anAmigos">
          <p style={linkStyles}>Añade amigos</p>
        </Link>
        <Link href="/session/mensajes">
          <p style={linkStyles}>Mensaje de amigos</p>
        </Link>
        <Link href="/session/CrearPublish">
          <p style={linkStyles}>Crear Publicacion</p>
        </Link>
        <Link href="/session/Consultas">
          <p style={linkStyles}>Consultas a pacientes</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
