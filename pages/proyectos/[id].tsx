import { useRouter } from "next/router";
import ProyectosDetalle from "@/components/proyectos/ProyectosDetalle";

const DetallePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h2>Detalles del Proyecto</h2>
      {id ? <ProyectosDetalle proyectoId={id} /> : <p>Cargando...</p>}
    </div>
  );
};

export default DetallePage;
