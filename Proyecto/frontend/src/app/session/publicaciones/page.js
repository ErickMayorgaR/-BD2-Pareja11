import React from 'react';
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

const Publicaciones = () => {
  // Datos simulados de tres publicaciones
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
    <Navbar nombreUsuario="Nombre del Usuario" />
    <div style={containerStyles}>
      <h1 className="text-2xl font-bold text-center mt-4 mb-6">PUBLICACIONES</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Itera sobre las publicaciones simuladas y muestra las tarjetas */}
        {mockPublicaciones.map((publicacion) => (
          <div key={publicacion.id} style={cardStyles}>
            <div className="profile">
              {/* Imagen del perfil y nombre del usuario */}
              <img src="url_de_la_imagen" alt="Imagen de perfil" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
              <span>{publicacion.usuario}</span>
            </div>
            <div className="content">
              {/* Contenido de la publicación */}
              <p>{publicacion.contenido}</p>
            </div>
            <div className="footer">
              {/* Fecha de la publicación */}
              <span>{publicacion.fecha}</span>
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
