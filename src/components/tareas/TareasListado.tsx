import { Proyecto } from "@/models/Proyecto";
import { Tarea } from "@/models/Tarea";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { Colaborador } from "@/models/Colaborador";

type TareasListadoProps = {
  proyecto: Proyecto;
  colaboradores: Colaborador[];
  tareaCreada: boolean;
  tareasUpdated: () => void;
};

const TareasListado = (props: TareasListadoProps) => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [editableTareaId, setEditableTareaId] = useState<number | null>(null);
  const [editedTitulo, setEditedTitulo] = useState<string>("");
  const [editedDescripcion, setEditedDescripcion] = useState<string>("");

  useEffect(() => {
    handleGetTareasPorProyectoId();
  }, [props.proyecto]);

  useEffect(() => {
    handleGetTareasPorProyectoId();
  }, [props.tareaCreada]);

  

  const handleGetTareasPorProyectoId = async () => {
    try {
      const response = await axios.get<Tarea[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/tareas/${props.proyecto.id}`
      );
      setTareas(response.data);
      props.tareasUpdated();
    } catch (error) {
      console.error("Error al obtener los detalles del proyecto", error);
    }
  };

  const handleEliminarTarea = async (tareaId: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/tareas/${tareaId}`
      );

      const updatedTareas = tareas.filter((tarea) => tarea.id !== tareaId);
      setTareas(updatedTareas);
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
    }
  };

  const handleEditarTarea = (tareaId: number) => {
    const tareaToEdit = tareas.find((tarea) => tarea.id === tareaId);
    if (tareaToEdit) {
      setEditableTareaId(tareaId);
      setEditedTitulo(tareaToEdit.titulo);
      setEditedDescripcion(tareaToEdit.descripcion);
    }
  };

  const handleGuardarEdicion = async (tareaId: number) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tareas/${tareaId}`, {
        titulo: editedTitulo,
        descripcion: editedDescripcion,
      });

      const updatedTareas = tareas.map((tarea) => {
        if (tarea.id === tareaId) {
          tarea.titulo = editedTitulo;
          tarea.descripcion = editedDescripcion;
        }
        return tarea;
      });

      setTareas(updatedTareas);
      setEditableTareaId(null);
    } catch (error) {
      console.error("Error al guardar la edición de la tarea", error);
    }
  };

  const handleMarcarTareaComoCompleta = async (tareaId: number) => {
    try {
      let response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tareas/completar/${tareaId}`
      );

      const updatedTareas = tareas.map((tarea) => {
        if (tarea.id === tareaId) {
          tarea.estado = response.data.estado;
        }
        return tarea;
      });

      setTareas(updatedTareas);
      setEditableTareaId(null);
    } catch (error) {
      console.error("Error al guardar la edición de la tarea", error);
    }
  };

  const tienePermisoEditar:boolean = (
    localStorage.getItem("userId") === props.proyecto.usuarioId?.toString() ||
    props.colaboradores?.some(
      (colaborador) =>
        colaborador.usuarioId === Number(localStorage.getItem("userId"))
    )
  );

  return (
    <>
      <Card>
        <h4>Listado de Tareas</h4>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {tareas.map((tarea) => (
            <li
              key={tarea.id}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                display: "flex",
                alignItems: "center",
              }}
            >
              {editableTareaId === tarea.id ? (
                <div>
                  <strong style={{ fontWeight: "bold" }}>Nombre:</strong>{" "}
                  <input
                    type="text"
                    value={editedTitulo}
                    onChange={(e) => setEditedTitulo(e.target.value)}
                    style={{
                      border: "1px solid #ccc",
                      padding: "5px",
                      fontSize: "inherit",
                    }}
                  />
                  <br />
                  <strong style={{ fontStyle: "bold" }}>
                    Descripción:
                  </strong>{" "}
                  <input
                    type="text"
                    value={editedDescripcion}
                    onChange={(e) => setEditedDescripcion(e.target.value)}
                    style={{
                      border: "1px solid #ccc",
                      padding: "5px",
                      fontSize: "inherit",
                    }}
                  />
                  <br />
                </div>
              ) : (
                <div>
                  <strong style={{ fontWeight: "bold" }}>Nombre:</strong>{" "}
                  {tarea.titulo}
                  <br />
                  <strong style={{ fontStyle: "bold" }}>
                    Descripción:
                  </strong>{" "}
                  {tarea.descripcion}
                  <br />
                  <strong style={{ fontStyle: "bold" }}>Estado:</strong>{" "}
                  {tarea.estado}
                  <br />
                  <strong style={{ fontStyle: "bold" }}>
                    Id Usuario Creador:
                  </strong>{" "}
                  {tarea.usuarioId}
                </div>
              )}
              <div style={{ marginLeft: "auto" }}>
                {editableTareaId === tarea.id ? (
                  <>
                    <Button
                      onClick={() => handleGuardarEdicion(tarea.id)}
                      label="Guardar"
                      className="p-button-info"
                      style={{ marginRight: "5px" }}
                    />
                    <Button
                      onClick={() => setEditableTareaId(null)}
                      label="Cancelar"
                      className="p-button-secondary"
                    />
                  </>
                ) : (
                  <>
                    {tienePermisoEditar && (
                      <>
                        <Button
                          onClick={() => handleEditarTarea(tarea.id)}
                          label="Editar"
                          className="p-button-info"
                          style={{ marginRight: "5px" }}
                        />
                        {tarea.estado == "pendiente" && (
                          <Button
                            onClick={() =>
                              handleMarcarTareaComoCompleta(tarea.id)
                            }
                            label="Tarea Completada"
                            className="p-button-info"
                            style={{ marginRight: "5px" }}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
                {localStorage.getItem("userId") ===
                  props.proyecto.usuarioId?.toString() && (
                  <Button
                    onClick={() => handleEliminarTarea(tarea.id)}
                    label="Eliminar"
                    className="p-button-danger"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default TareasListado;
