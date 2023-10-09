import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("response", response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        router.push("/");
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
      <Link href="/auth/register">Registrarse</Link>
    </>
  );
};

export default Login;

