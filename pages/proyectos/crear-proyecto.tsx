import withAuthentication from "@/components/auth/WithAuthentication";
import ProyectosNuevo from "@/components/proyectos/ProyectosNuevo";
import React from "react";


const CrearProyectoPage: React.FC = () => {
  return (
    <>
      <ProyectosNuevo />
    </>
  );
};

export default withAuthentication(CrearProyectoPage);
