import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "primereact/button"; // Importa el componente Button
import "primereact/resources/themes/lara-light-indigo/theme.css";
import ProyectosListado from "../src/components/proyectos/ProyectosListado";


function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Establece isLoggedIn en verdadero si hay un token
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>Bienvenido al Administrador de proyectos</h1>

          <ProyectosListado />
          <div id='cerrar-sesion-btn'>
            <Button
              label="Cerrar Sesión"
              onClick={handleLogout}
              className="p-button-danger"
              size="small"
              style={{ marginTop: "20px" }}
            />
          </div>
        </>
      ) : (
        <h1>Bienvenido, por favor inicia sesión</h1>
      )}
    </>
  );
}

export default Home;
