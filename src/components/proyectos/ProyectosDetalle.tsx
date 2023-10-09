import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import axios from "axios";
import { Router, useRouter } from "next/router";
import TareasNueva from "../tareas/TareasNueva";
import { Proyecto } from "@/models/Proyecto";
import TareasListado from "../tareas/TareasListado";

export type ProyectosDetalleProps = {
  proyectoId: string | string[];
};

const ProyectosDetalle = (props: ProyectosDetalleProps) => {
  const router = useRouter();
  const [proyecto, setProyecto] = useState<Proyecto | undefined>();
  const [tareaCreada, setTareaCreada] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedNombre, setEditedNombre] = useState<string>("");
  const [editedDescripcion, setEditedDescripcion] = useState<string>("");

  useEffect(() => {
    handleGetDetalleProyectoPorId();
  }, [props.proyectoId]);

  const handleGetDetalleProyectoPorId = async () => {
    try {
      const response = await axios.get<Proyecto>(
        `${process.env.NEXT_PUBLIC_API_URL}/proyectos/${props.proyectoId}`
      );
      setProyecto(response.data);
      setEditedNombre(response.data.nombre); // Actualiza los valores iniciales al obtener el proyecto
      setEditedDescripcion(response.data.descripcion);
    } catch (error) {
      console.error("Error al obtener los detalles del proyecto", error);
    }
  };

  const handleEditarClick = () => {
    setIsEditing(true);
    console.log("llego")
  };

  const handleGuardarClick = async () => {
    console.log("editedNombre", editedNombre);
    console.log("editedDescripcion", editedDescripcion);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/proyectos/${proyecto?.id}`,
        {
          nombre: editedNombre,
          descripcion: editedDescripcion,
        }
      );
      console.log("Proyecto editado correctamente:", response.data);
    } catch (error) {
      console.error("Error al editar el proyecto", error);
    }
    handleGetDetalleProyectoPorId();
    setIsEditing(false);
  };

  const handleCancelarClick = () => {
    setEditedNombre(proyecto?.nombre || "");
    setEditedDescripcion(proyecto?.descripcion || "");
    setIsEditing(false);
  };

  const handleEditarProyecto = () => {
    handleEditarClick();
  };

  const handleEliminarProyecto = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/proyectos/${proyecto?.id}`
      );
      console.log("Proyecto editado correctamente:", response.data);
    } catch (error) {
      console.error("Error al editar el proyecto", error);
    }
    router.push("/");
  };

  const handleTareaCreada = () => {
    setTareaCreada(true);
  }

  return (
    <>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li
          key={proyecto?.id}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          <strong style={{ fontStyle: "bold" }}>Id:</strong> {proyecto?.id}
          <br />
        </li>
        <li
          key={proyecto?.nombre}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          {isEditing ? (
            <>
              <strong style={{ fontWeight: "bold" }}>Nombre:</strong>{" "}
              <input
                style={{
                  border: "1px solid #ccc",
                  padding: "5px",
                  fontSize: "inherit",
                }}
                type="text"
                value={editedNombre}
                onChange={(e) => setEditedNombre(e.target.value)}
              />
            </>
          ) : (
            <>
              <strong style={{ fontWeight: "bold" }}>Nombre:</strong>{" "}
              {proyecto?.nombre}
            </>
          )}
          <br />
        </li>
        <li
          key={proyecto?.descripcion}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          {isEditing ? (
            <>
              <strong style={{ fontStyle: "bold" }}>Descripción:</strong>{" "}
              <input
                style={{
                  border: "1px solid #ccc",
                  padding: "5px",
                  fontSize: "inherit",
                }}
                type="text"
                value={editedDescripcion}
                onChange={(e) => setEditedDescripcion(e.target.value)}
              />
            </>
          ) : (
            <>
              <strong style={{ fontStyle: "bold" }}>Descripción:</strong>{" "}
              {proyecto?.descripcion}
            </>
          )}
        </li>
        <li>
          {isEditing ? (
            <>
              <Button
                onClick={handleGuardarClick}
                label="Guardar"
                className="p-button-info"
                style={{ marginRight: "30px" }}
              />
              <Button
                onClick={handleCancelarClick}
                label="Cancelar"
                className="p-button-secondary"
              />
            </>
          ) : (
            <>
              <Button
                onClick={handleEditarProyecto}
                label="Editar proyecto"
                className="p-button-info"
                style={{ marginRight: "30px" }}
              />
              <Button
                onClick={handleEliminarProyecto}
                label="Eliminar proyecto"
                className="p-button-danger"
                style={{ marginRight: "30px" }}
              />
              {proyecto && <TareasNueva proyecto={proyecto} tareaCreada={handleTareaCreada} />}
              {proyecto && <TareasListado proyecto={proyecto} tareaCreada={tareaCreada} tareasUpdated={() => setTareaCreada(false)} />}
            </>
          )}
        </li>
        <li>
          <Button
            label="Volver"
            onClick={() => router.push("/")}
            className="p-button-danger"
            size="small"
            style={{ marginTop: "30px" }}
          />
        </li>
      </ul>
    </>
  );
};

export default ProyectosDetalle;
