"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/page';

const containerStyles = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
};

const cardStyles = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
  textAlign: 'center',
};

const MisAmigos = () => {
  const [amigos, setAmigos] = useState([]);

  useEffect(() => {
    obtenerAmigos();
  }, []);

  const obtenerAmigos = async () => {
    try {
      const response = await fetch('http://localhost:4000/verMisAmigos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Juan Pérez López', // Nombre quemado
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAmigos(data.amigos || []);
      } else {
        console.error('Error al obtener la lista de amigos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <>
      <Navbar nombreUsuario="Nombre del Usuario" />
      <div style={containerStyles}>
        <h1 className="text-2xl font-bold text-center mt-4 mb-6">MIS AMIGOS</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amigos.length === 0 ? (
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
                Aún no tienes amigos
              </p>
              <p style={{ color: 'blue', fontSize: '18px' }}>
                Siéntete libre de agregar más amigos
              </p>
            </div>
          ) : (
            amigos.map((amigo) => (
              <div key={amigo.username} style={cardStyles}>
                <div className="profile">
                  <img
                    src={amigo.url_de_la_imagen || 'default_image_url'}
                    alt="Imagen de perfil"
                    style={{
                      width: '35px',
                      height: '50px',
                      borderRadius: '50%',
                      marginRight: '10px',
                    }}
                  />
                  <span>{amigo.name}</span>
                </div>
                <div className="content">
                  <p>{"PAGINA DE PERFIL"}</p>
                </div>
                <div className="footer">
                  <button
                    style={{
                      backgroundColor: 'blue',
                      color: 'white',
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    Suprimir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MisAmigos;
