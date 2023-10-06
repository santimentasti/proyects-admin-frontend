import AuthWrapper from "@/components/AuthWrapper";
import Link from "next/link";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import ProyectosListado from "./proyectos/ProyectosListado";
function Home() {
  return (
    <>
      <AuthWrapper>
        <h1>Bienvenido al Administrador de proyectos</h1>
        <ProyectosListado />
      </AuthWrapper>
    </>
  );
}

export default Home;
