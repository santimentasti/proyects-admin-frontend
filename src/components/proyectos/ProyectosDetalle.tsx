import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { useRouter } from "next/router";
import TareasNueva from "../tareas/TareasNueva";
import { Proyecto } from "@/models/Proyecto";
import TareasListado from "../tareas/TareasListado";
import { Usuario } from "@/models/Usuario";
import { Message } from "primereact/message";
import { Colaborador } from "@/models/Colaborador";

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
  const [usuarioColaborador, setUsuarioColaborador] = useState<Usuario | null>(
    null
  ); // Estado para el usuario colaborador
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleGetDetalleProyectoPorId();
    getUsuarios();
    handleGetColaboradoresPorProyectoId();
  }, [props.proyectoId]);

  const handleGetColaboradoresPorProyectoId = async () => {
    try {
      const response = await axios.get<Colaborador[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/proyectos/${props.proyectoId}/colaboradores`
      );
      setColaboradores(response.data);
    } catch (error) {
      console.error("Error al obtener los colaboradores del proyecto", error);
    }
  };

  const getUsuarios = async () => {
    try {
      const response = await axios.get<Usuario[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/usuarios/`
      );
      const usuarioActualId = localStorage.getItem("userId");
      const usuarios = response.data.filter(
        (usuario) => usuario.id.toString() !== usuarioActualId
      );
      setUsuarios(usuarios);
    } catch (error) {
      console.error("Error al obtener los usuarios", error);
    }
  };

  const handleGetDetalleProyectoPorId = async () => {
    try {
      const response = await axios.get<Proyecto>(
        `${process.env.NEXT_PUBLIC_API_URL}/proyectos/${props.proyectoId}`
      );
      setProyecto(response.data);
      setEditedNombre(response.data.nombre);
      setEditedDescripcion(response.data.descripcion);
    } catch (error) {
      console.error("Error al obtener los detalles del proyecto", error);
    }
  };

  const handleEditarClick = () => {
    setIsEditing(true);
  };

  const handleGuardarClick = async () => {
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
      console.log("Proyecto eliminado correctamente:", response.data);
    } catch (error) {
      console.error("Error al eliminar el proyecto", error);
    }
    router.push("/");
  };

  const handleTareaCreada = () => {
    setTareaCreada(true);
  };

  const agregarColaboradores = async () => {
    console.log("usuarioColaborador", usuarioColaborador);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/proyectos/${proyecto?.id}/colaboradores`,
        {
          colaboradorId: usuarioColaborador?.id, // Envia el ID del usuario colaborador
        }
      );
      setUsuarioColaborador(null);
      console.log("Colaborador agregado correctamente:", response.data);
      setError("");
    } catch (error) {
      console.error("Error al agregar colaboradores", error);
      setError("Error al agregar colaboradores.");
    }
  };

  const tienePermisoEditar: boolean =
    localStorage.getItem("userId") === proyecto?.usuarioId?.toString() ||
    colaboradores?.some(
      (colaborador) =>
        colaborador.usuarioId === Number(localStorage.getItem("userId"))
    );

  const tienePermisoEditarAdmin: boolean =
    localStorage.getItem("userId") === proyecto?.usuarioId?.toString();

  return (
    <>
      {error && <Message severity="error" text={error} />}
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
              {
                tienePermisoEditarAdmin &&
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
                </>
              }
              {proyecto && tienePermisoEditarAdmin && (
                <>
                  <div>
                    <h3>Usuarios Disponibles para Colaborar:</h3>
                    <Dropdown
                      optionLabel="username"
                      value={usuarioColaborador}
                      options={usuarios}
                      onChange={(e) => setUsuarioColaborador(e.value)}
                      placeholder="Seleccione un colaborador"
                    />
                  </div>
                  <div style={{ marginBottom: "30px", marginTop: "20px" }}>
                    <Button
                      onClick={agregarColaboradores}
                      label="Agregar Colaboradores"
                      className="p-button-success"
                    />
                    <Button
                      onClick={() => setUsuarioColaborador(null)} // Botón para limpiar selección
                      label="Limpiar Selección"
                      className="p-button-secondary"
                      style={{ marginLeft: "10px" }}
                    />
                  </div>
                </>
              )}
              {localStorage.getItem("userId") ==
                proyecto?.usuarioId?.toString() &&
                proyecto && (
                  <TareasNueva
                    proyecto={proyecto}
                    tareaCreada={handleTareaCreada}
                  />
                )}
              {proyecto && (
                <TareasListado
                  proyecto={proyecto}
                  tareaCreada={tareaCreada}
                  tareasUpdated={() => setTareaCreada(false)}
                  colaboradores={colaboradores}
                />
              )}
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
