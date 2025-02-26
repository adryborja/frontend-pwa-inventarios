import { useEffect, useState } from "react";
import { usuarioService } from "../../services/usuarioService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Usuario } from "../../types/types"; // 👈 Importa el tipo Usuario

export const UserList: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // 👈 Especifica el tipo correcto

  useEffect(() => {
    usuarioService.findAll().then((data) => setUsuarios(data)); // 👈 Ahora TypeScript lo acepta
  }, []);

  return (
    <DataTable value={usuarios}>
      <Column field="id_usuario" header="ID" sortable />
      <Column field="nombre_completo" header="Nombre Completo" sortable />
      <Column field="email" header="Email" sortable />
      <Column field="telefono" header="Teléfono" sortable />
      <Column field="estado" header="Estado" sortable />
      <Column field="fecha_creacion" header="Fecha Creación" sortable />
    </DataTable>
  );
};


