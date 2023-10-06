import { useEffect } from 'react';
import { useRouter } from 'next/router';

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const verificarAutenticacion = async () => {
      try {
        // Realiza una solicitud al servidor para verificar la autenticación
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/usuario-autenticado`); // Ruta en tu backend que verifica la autenticación

        if (!response.ok) {
          // Si la respuesta no es exitosa (por ejemplo, el usuario no está autenticado), redirige al inicio de sesión
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error al verificar la autenticación', error);
      }
    };

    verificarAutenticacion();
  }, []);

  return <>{children}</>;
}

export default AuthWrapper;