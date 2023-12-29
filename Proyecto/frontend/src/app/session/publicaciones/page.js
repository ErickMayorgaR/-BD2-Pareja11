"use client";
import Navbar from '../Navbar/page';
import React, { useState, useEffect } from 'react';

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


const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET al servidor
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      console.log(user)
      //console.log(user)
    }
    
    fetch('http://localhost:4000/obtenerPublicaciones')
      .then((response) => response.json())
      .then((data) => {
        // Establecer las publicaciones recibidas en el estado
        setPublicaciones(data);
      })
      .catch((error) => {
        console.error('Error al obtener las publicaciones:', error);
      });
  }, []);


  return (
    <>
      <Navbar nombreUsuario="Nombre del Usuario" />
      <div style={containerStyles}>
        <h1 className="text-2xl font-bold text-center mt-4 mb-6">PUBLICACIONES</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Iterar sobre las publicaciones recibidas y mostrar las tarjetas */}
          {publicaciones.map((publicacion, index) => (
            <div key={index} style={cardStyles}>
              <div className="profile">
                {/* Imagen del perfil y nombre del usuario */}
                <img src="url_de_la_imagen" alt="Imagen de perfil" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                <span>{publicacion.autor}</span>
              </div>
              <div className="content">
                {/* Contenido de la publicación */}
                <p>{publicacion.contenido}</p>
              </div>
              <div className="footer">
                {/* Fecha de la publicación */}
                <span>{new Date(publicacion.fecha).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Agregar paginación si hay más de 10 publicaciones */}
        {/* O implementar lógica de carga de más publicaciones */}
      </div>
    </>
  );
};

export default Publicaciones;