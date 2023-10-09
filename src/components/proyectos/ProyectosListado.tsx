import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import ProyectosDetalle from "./ProyectosDetalle"; // Importa el componente de detalle
import { Card } from "primereact/card";
import { useRouter } from "next/router";
export type Proyecto = {
  id: number;
  nombre: string;
  descripcion: string;
  usuarioId: number;
};

const ProyectosListado = () => {
  const router = useRouter();
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<
    Proyecto | undefined
  >(undefined);

  useEffect(() => {
    // Realiza una solicitud GET al servidor para obtener la lista de proyectos
    const obtenerProyectos = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/proyectos/`
        );
        setProyectos(response.data);
      } catch (error) {
        console.error("Error al obtener proyectos", error);
      }
    };

    obtenerProyectos();
  }, []);

  const handleCrearProyectoClick = () => {
    router.push("/proyectos/crear-proyecto");
  };

  const handleProyectoClick = (proyecto: Proyecto) => {
    console.log("proyecto", proyecto);
    /* router.push(`/proyectos/${proyecto.id}`); */
    setProyectoSeleccionado(proyecto);
  };

  return (
    <>
      <Card>
        <h2>Listado de Proyectos</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {proyectos.map((proyecto) => (
            <li
              key={proyecto.id}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onClick={() => handleProyectoClick(proyecto)}
            >
              <strong style={{ fontWeight: "bold" }}>Nombre:</strong>{" "}
              {proyecto.nombre}
              <br />
              <strong style={{ fontStyle: "italic" }}>Descripción:</strong>{" "}
              {proyecto.descripcion}
            </li>
          ))}
        </ul>
        <Button label="Crear proyecto" onClick={handleCrearProyectoClick} />
      </Card>
      {proyectoSeleccionado && (
        <ProyectosDetalle proyecto={proyectoSeleccionado as Proyecto} />
      )}
    </>
  );
};

export default ProyectosListado;
