import { Proyecto } from "./Proyecto";
import { Usuario } from "./Usuario";

export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    estado: string;
    proyectoId?: number;
    usuarioId?: number;
  }