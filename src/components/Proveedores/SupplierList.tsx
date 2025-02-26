import { useEffect, useRef, useState } from "react";
import { proveedorService } from "../../services/proveedorService";
import { Proveedor } from "../../types/types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

export const SupplierList: React.FC = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const toast = useRef<Toast>(null);

  const loadProveedores = async () => {
    try {
      const data = await proveedorService.findAll();
      setProveedores(data);
    } catch (error) {
      console.error("Error al cargar proveedores:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron cargar los proveedores",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    loadProveedores();
  }, []);

  return (
    <div>
      <Toast ref={toast} />
      <h2>Gestión de Proveedores</h2>
      <DataTable value={proveedores}>
        <Column field="id_proveedor" header="ID" sortable />
        <Column field="nombre" header="Nombre" sortable />
        <Column field="contacto" header="Contacto" sortable />
        <Column field="telefono" header="Teléfono" sortable />
        <Column field="email" header="Email" sortable />
      </DataTable>
    </div>
  );
};

