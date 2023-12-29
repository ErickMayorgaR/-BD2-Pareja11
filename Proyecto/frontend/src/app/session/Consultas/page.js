"use client";
import React, { useState, useEffect } from 'react';
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

const ConsultasPacientes = () => {
  const [consultaSeleccionada, setConsultaSeleccionada] = useState('');
  const [dataConsulta, setDataConsulta] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;

  const handleConsultaChange = (e) => {
    setConsultaSeleccionada(e.target.value);
  };

  const fetchData = async () => {
    try {
        console.log(consultaSeleccionada)
      const response = await fetch(`http://localhost:4000/${consultaSeleccionada}`);
      const data = await response.json();
      setDataConsulta(data);
      setPaginaActual(1); // Reiniciar la página a la primera cuando cambie la consulta
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const handlePagination = (action) => {
    if (action === 'prev' && paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    } else if (action === 'next' && paginaActual < Math.ceil(dataConsulta.length / registrosPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [consultaSeleccionada]); // Se ejecuta cada vez que cambia la consulta seleccionada

  return (
    <>
      <Navbar nombreUsuario="Nombre del Usuario" />
      <div style={containerStyles}>
        <h1 className="text-2xl font-bold text-center mt-4 mb-6">CONSULTAS DE INFORMACIÓN DE PACIENTES</h1>
        <select value={consultaSeleccionada} onChange={handleConsultaChange} style={inputStyles}>
          <option value="">Seleccionar consulta</option>
          <option value="totalPacientesEdad">Consulta 1</option>
          <option value="pacientesHabitacion">Consulta 2</option>
          <option value="pacientesGenero">Consulta 3</option>
          <option value="topMasAtendido">Consulta 4</option>
          <option value="topMenosAtendido">Consulta 5</option>
        </select>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              {/* Ajusta las cabeceras según la estructura de los datos devueltos */}
              {Object.keys(dataConsulta[0] || {}).map((key) => (
                <th key={key} style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Renderizar los datos por página */}
            {dataConsulta.slice((paginaActual - 1) * registrosPorPagina, paginaActual * registrosPorPagina).map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, i) => (
                  <td key={i} style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <button style={{backgroundColor: 'red', borderColor: 'white', border: '1px solid #ddd'}} onClick={() => handlePagination('prev')} disabled={paginaActual === 1}>
            Anterior
          </button>
          <button style={{backgroundColor: 'red', borderColor: 'white', border: '1px solid #ddd'}} onClick={() => handlePagination('next')} disabled={paginaActual >= Math.ceil(dataConsulta.length / registrosPorPagina)}>
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default ConsultasPacientes;
