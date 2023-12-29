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
  
const Perfil = () => {
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
    <div>
      {/* Título del perfil */}
      <h1 style={{textAlign: 'center'}}>Perfil de {perfilUsuario.nombreUsuario}</h1>

      {/* Información del perfil */}
      <div style={{textAlign: 'center'}}>
        <h2>Información personal</h2>
        <input type="text" style={{width: '90%'}} value={perfilUsuario.nombreCompleto} disabled />
        <input type="text" style={{width: '90%'}} value={perfilUsuario.nombreUsuario} disabled />
        <input type="text" style={{width: '90%'}} value={perfilUsuario.edad} disabled />
        <input type="text" style={{width: '90%'}} value={perfilUsuario.sitioWeb} disabled />
        <input type="text" style={{width: '90%'}} value={perfilUsuario.especialidad} disabled />
        <button style={{ backgroundColor: 'blue', color: 'white', width: '90%'}}>Ya son amigos</button>
      </div>

      {/* Sus cursos */}
      <div>
        <h2 style={{textAlign: 'center'}}>Sus cursos</h2>
        {perfilUsuario.cursos.map((curso) => (
          <div key={curso.id} style={{marginLeft: '5%', marginRight: '5%'}}>
            <span>PDF</span>
            <span>{curso.nombre}</span>
          </div>
        ))}
      </div>

      {/* Sus amigos */}
        <h2 style={{textAlign: 'center'}}>Sus amigos</h2>
        {/* Itera sobre las publicaciones simuladas y muestra las tarjetas */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5" style={{textAlign: 'center', marginLeft: '5%', marginRight: '5%'}}>
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
    </div>
    </>
  );
};

export default Perfil;
