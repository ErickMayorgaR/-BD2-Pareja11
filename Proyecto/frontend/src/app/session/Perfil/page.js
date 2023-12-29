"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/page';

// Estilos en línea para Container
const containerStyles = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  };
  
  // Estilos en línea para PublicationCard
  const cardStyles = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
  };


/*
 const userData = sessionStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(amigosData);
    console.log(userData)
  }
*/

const Perfil = () => {
  const [userData, setUserData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const userDataFromSession = sessionStorage.getItem("user");
    if (userDataFromSession) {
      const user = JSON.parse(userDataFromSession);
      setUserData(user);
      if (user.foto) {
        setImageSrc(user.foto);
      }
    }
  }, []);

  // Datos simulados del perfil del usuario
  const perfilUsuario = {
    nombreCompleto: 'Nombre Apellido',
    nombreUsuario: 'usuario123',
    edad: 25,
    sitioWeb: 'www.ejemplo.com',
    especialidad: 'Especialidad en...',
    cursos: [
      { id: 1, nombre: 'Curso 1' },
      { id: 2, nombre: 'Curso 2' },
      { id: 3, nombre: 'Curso 3' },
    ]
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      // Aquí podrías enviar la imagen al servidor si es necesario
      // y actualizar el estado 'userData' con la nueva URL de la imagen
    }
  };

  const mockPublicaciones = [
    {
      id: 1,
      usuario: 'Usuario 1',
      contenido: 'Contenido de la publicación 1',
      fecha: '2023-12-25',
    },
    {
      id: 2,
      usuario: 'Usuario 2',
      contenido: 'Contenido de la publicación 2',
      fecha: '2023-12-26',
    },
    {
      id: 3,
      usuario: 'Usuario 3',
      contenido: 'Contenido de la publicación 3',
      fecha: '2023-12-27',
    },
  ];

 return (
    <>
      <Navbar nombreUsuario={userData ? userData.username : "Nombre del Usuario"} />
      <div style={containerStyles}>
        <h1 style={{ textAlign: 'center' }}>Perfil de {userData ? userData.username : perfilUsuario.nombreUsuario}</h1>

        
        {/* Campo para cargar la imagen */}
        {userData && (
          <div style={{ textAlign: 'center', alignContent: 'center' }}>
            <img src={imageSrc || userData.foto} alt="Imagen de perfil" style={{ width: '100px', height: '100px', borderRadius: '50%' , textAlign: 'center'}} />
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <h2>Información personal</h2>
          <input type="text" style={{ width: '90%' , color: 'black'}} value={userData ? userData.name : perfilUsuario.nombreCompleto} disabled />
          <input type="text" style={{ width: '90%' , color: 'black'}} value={userData ? userData.username : perfilUsuario.nombreUsuario} disabled />
          <input type="text" style={{ width: '90%' , color: 'black'}} value={userData ? userData.age : perfilUsuario.edad} disabled />
          <input type="text" style={{ width: '90%' , color: 'black'}} value={userData ? userData.email : perfilUsuario.sitioWeb} disabled />
          <input type="text" style={{ width: '90%' , color: 'black'}} value={userData ? userData.especialidad : perfilUsuario.especialidad} disabled />
          <button style={{ backgroundColor: 'blue', color: 'white', width: '90%' }}>Ya son amigos</button>
        </div>

        <div>
          <h2 style={{ textAlign: 'center' }}>Sus cursos</h2>
          {perfilUsuario.cursos.map((curso) => (
            <div key={curso.id} style={{ marginLeft: '5%', marginRight: '5%' }}>
              <span>PDF</span>
              <span>{curso.nombre}</span>
            </div>
          ))}
        </div>

        <h2 style={{ textAlign: 'center' }}>Sus amigos</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5" style={{ textAlign: 'center', marginLeft: '5%', marginRight: '5%' }}>
          {mockPublicaciones.map((publicacion) => (
            <div key={publicacion.id} style={cardStyles}>
              <div className="profile">
                <img src="url_de_la_imagen" alt="Imagen de perfil" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                <span>{publicacion.usuario}</span>
              </div>
              <div className="content">
                <p>{publicacion.contenido}</p>
              </div>
              <div className="footer">
                <span>{publicacion.fecha}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Perfil;
