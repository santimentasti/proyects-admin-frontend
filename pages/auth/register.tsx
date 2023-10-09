import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import axios from 'axios'; // Importa Axios

interface RegisterForm {
  nombre: string;
  apellido: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const apiUrl = 'http://localhost:8080';
  const [formData, setFormData] = useState<RegisterForm>({
    nombre: '',
    apellido: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/registro`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log(response);
        window.location.href = '/';
      } else {
        setError('Error al registrar al usuario. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al registrar al usuario:', error);
      setError(
        'Se produjo un error al registrar al usuario. Por favor, inténtalo de nuevo más tarde.'
      );
    }
  };

  return (
    <div className="register-container">
      <Card title="Registrarse" className="register-card">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user" />
          </span>
          <InputText
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user" />
          </span>
          <InputText
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user" />
          </span>
          <InputText
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-lock" />
          </span>
          <InputText
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-lock" />
          </span>
          <InputText
            name="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <Button label="Registrarse" onClick={handleRegister} />
        {error && <p className="error-message">{error}</p>}
      </Card>
    </div>
  );
};

export default Register;
