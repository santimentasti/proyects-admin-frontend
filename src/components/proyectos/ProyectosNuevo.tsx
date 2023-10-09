import React, { useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Proyecto } from "./ProyectosListado";
import { Router, useRouter } from "next/router";

const ProyectosNuevo = () => {
  const router = useRouter();
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");

  const crearProyecto = async () => {
    const userIdString = localStorage.getItem("userId");
    const usuarioId = userIdString ? parseInt(userIdString) : null;
    console.log("usuarioId", usuarioId)
    console.log("userIdString", userIdString)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/proyectos/`,
        {
          nombre,
          descripcion,
          usuarioId,
        }
      );
      console.log("Proyecto creado:", response.data);
      router.push('/');
    } catch (error) {
      console.error("Error al crear el proyecto", error);
    }
  };

  return (
    <>
      <h2>Crear Proyecto</h2>
      <span className="p-float-label">
        <InputText
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          id="nombre"
        />
        <label htmlFor="nombre">Nombre</label>
      </span>
      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        <span className="p-float-label">
          <InputTextarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            id="descripcion"
          />
          <label htmlFor="descripcion">Descripción</label>
        </span>
      </div>
      <Button label="Crear proyecto" onClick={crearProyecto} />
    </>
  );
};

export default ProyectosNuevo;
