import React, { useState } from "react";
import { Button } from "primereact/button";
import axios from "axios";
import { Proyecto } from "@/models/Proyecto";
import { Tarea } from "@/models/Tarea";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";

export type TareasNuevaProps = {
  proyecto: Proyecto;
  tareaCreada: () => void;
};

const TareasNueva = (props: TareasNuevaProps) => {
  const [tarea, setTarea] = useState<Tarea>();
  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [mostrarCrearTarea, setMostrarCrearTarea] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAgregarTarea = async () => {
    if (!titulo || !descripcion) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const proyectoId = props.proyecto.id;
    const userIdString = localStorage.getItem("userId");
    const usuarioId = userIdString ? parseInt(userIdString) : null;

    try {
      const response = await axios.post<Tarea>(
        `${process.env.NEXT_PUBLIC_API_URL}/tareas/`,
        {
          titulo,
          descripcion,
          estado: "pendiente",
          proyectoId,
          usuarioId,
        }
      );
      console.log("Tarea creada:", response.data);
      setMostrarCrearTarea(false);
      setTitulo("");
      setDescripcion("");
      props.tareaCreada();
    } catch (error) {
      console.error("Error al crear la tarea", error);
    }
  };

  const handleCancelarAgregarTarea = () => {
    setMostrarCrearTarea(false);
    setTitulo("");
    setDescripcion("");
  };
  return (
    <>
      <Button
        label="Agregar nueva tarea"
        onClick={() => setMostrarCrearTarea(true)}
      />
      {mostrarCrearTarea && (
        <>
          <h4>Crear Tarea</h4>
          <div style={{ marginTop: "30px" }}>
            <span className="p-float-label">
              <InputText
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                id="titulo"
              />
              <label htmlFor="titulo">Título</label>
            </span>
          </div>
          <div style={{ marginTop: "30px" }}>
            <span className="p-float-label">
              <InputTextarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                id="descripcion"
              />
              <label htmlFor="descripcion">Descripción</label>
            </span>
          </div>
          {error && (
            <div className="p-error" style={{ marginBottom: "20px" }}>
              {error}
            </div>
          )}
          <Button
            onClick={handleAgregarTarea}
            label="Agregar"
            style={{ marginRight: "30px", marginTop: '20px' }}
          />
          <Button
            onClick={handleCancelarAgregarTarea}
            label="Cancelar"
            style={{ marginRight: "30px" }}
          />
        </>
      )}
    </>
  );
};

export default TareasNueva;
