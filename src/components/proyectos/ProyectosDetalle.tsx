import React from 'react'
import { Proyecto } from './ProyectosListado'

export type ProyectosDetalleProps = {
    proyecto: Proyecto;
}

const ProyectosDetalle = (props: ProyectosDetalleProps) => {
  console.log("props.proyecto detalle", props.proyecto)
  return (
    <div>ProyectosDetalle</div>
  )
}

export default ProyectosDetalle;