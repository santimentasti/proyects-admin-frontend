import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import ProyectosListado from "../src/components/proyectos/ProyectosListado";

function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>Bienvenido al Administrador de proyectos</h1>

          <ProyectosListado />
          <div id="cerrar-sesion-btn">
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
        <>
          <h1>Bienvenido, por favor inicia sesión</h1>
          <Button
            label="Iniciar Sesión"
            onClick={() => router.push("/auth/login")}
          />
        </>
      )}
    </>
  );
}

export default Home;
