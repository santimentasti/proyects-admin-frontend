import React, { useEffect, useState } from "react";
import axios from "axios";

type Proyecto = {
  id: number;
  nombre: string;
  descripcion: string;
};

const ProyectosListado = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  useEffect(() => {
    // Realiza una solicitud GET al servidor para obtener la lista de proyectos
    const obtenerProyectos = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/proyectos/`); // Ajusta la URL según la configuración de tu servidor
        setProyectos(response.data); // Establece los proyectos en el estado local
      } catch (error) {
        console.error('Error al obtener proyectos', error);
      }
    };

    obtenerProyectos();
  }, []);

  return <><div>
  <h2>Listado de Proyectos</h2>
  <ul>
    {proyectos.map((proyecto) => (
      <li key={proyecto.id}>
        <strong>Nombre:</strong> {proyecto.nombre}
        <br />
        <strong>Descripción:</strong> {proyecto.descripcion}
      </li>
    ))}
  </ul>
</div></>;
};

export default ProyectosListado;
