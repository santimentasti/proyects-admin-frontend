import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import Link from "next/link";

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        setError("Nombre de usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(
        "Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  const handleRegister = () => {
    window.location.href = '/auth/register';
  };

  return (
    <>
      <Card title="Iniciar Sesión">
        <InputText
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleInputChange}
        />
        <InputText
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button label="Iniciar Sesión" onClick={handleLogin} />
        {error && <p className="error-message">{error}</p>}
      </Card>
      <Link href="/auth/register">
        Registrarse
      </Link>
    </>
  );
}

export default Login;
