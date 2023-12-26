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
  textAlign: 'center'
};

const MisAmigos = () => {
    const mockMisAmigos = [
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
        <h1 className="text-2xl font-bold text-center mt-4 mb-6">MIS AMIGOS</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Iterar sobre las publicaciones simuladas y mostrar las tarjetas */}
          {mockMisAmigos.length === 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '200px',
              }}
            >
              <p style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>
                Aun no tienes amigos
              </p>
              <p style={{ color: 'blue', fontSize: '18px' }}>
                Siéntete libre de agregar más amigos
              </p>
            </div>
          ) : (
            mockMisAmigos.map((MisAmigos) => (
                <div key={MisAmigos.id} style={cardStyles}>
                <div className="profile">
                  {/* Imagen del perfil y nombre del usuario */}
                  <img src="url_de_la_imagen" alt="Imagen de perfil" style={{ width: '35px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                  <span>{MisAmigos.usuario}</span>
                </div>
                <div className="content">
                  {/* Contenido de la publicación */}
                  <p>{"PAGINA DE PERFIL"}</p>
                </div>
                <div className="footer">
                    {/* Botón para suprimir la publicación */}
                    <button
                        style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width: '100%'
                        }}
                    >
                        Suprimir
                    </button>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Agregar paginación si hay más de 10 amigos */}
        {/* O implementar lógica de carga de más amigos */}
      </div>
    </>
    );
  };

export default MisAmigos;
