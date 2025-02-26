import { useState, useRef, useEffect } from "react";
import { proveedorService } from "../../services/proveedorService";
import { Proveedor } from "../../types/types";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

interface SupplierFormProps {
  proveedor?: Proveedor | null;
  onHide: () => void;
  onSave: () => void;
}

export const SupplierForm: React.FC<SupplierFormProps> = ({ proveedor, onHide, onSave }) => {
  const [proveedorData, setProveedorData] = useState<Partial<Proveedor>>({
    nombre: "",
    contacto: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (proveedor) {
      setProveedorData(proveedor);
    } else {
      setProveedorData({
        nombre: "",
        contacto: "",
        telefono: "",
        email: "",
        direccion: "",
      });
    }
  }, [proveedor]);

  const handleSubmit = async () => {
    try {
      if (proveedor?.id_proveedor) {
        await proveedorService.update(proveedor.id_proveedor, proveedorData);
      } else {
        await proveedorService.create(proveedorData);
      }

      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Proveedor guardado correctamente",
        life: 3000,
      });

      onSave();
      onHide();
    } catch (error) {
      console.error("Error al guardar proveedor:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo guardar el proveedor",
        life: 3000,
      });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>{proveedor ? "Editar Proveedor" : "Nuevo Proveedor"}</h2>

      <div className="p-field">
        <label>Nombre:</label>
        <InputText value={proveedorData.nombre || ""} onChange={(e) => setProveedorData({ ...proveedorData, nombre: e.target.value })} />
      </div>

      <div className="p-field">
        <label>Contacto:</label>
        <InputText value={proveedorData.contacto || ""} onChange={(e) => setProveedorData({ ...proveedorData, contacto: e.target.value })} />
      </div>

      <div className="p-field">
        <label>Teléfono:</label>
        <InputText value={proveedorData.telefono || ""} onChange={(e) => setProveedorData({ ...proveedorData, telefono: e.target.value })} />
      </div>

      <div className="p-field">
        <label>Email:</label>
        <InputText value={proveedorData.email || ""} onChange={(e) => setProveedorData({ ...proveedorData, email: e.target.value })} />
      </div>

      <div className="p-field">
        <label>Dirección:</label>
        <InputText value={proveedorData.direccion || ""} onChange={(e) => setProveedorData({ ...proveedorData, direccion: e.target.value })} />
      </div>

      <Button label="Guardar" icon="pi pi-save" className="p-button-success" onClick={handleSubmit} />
      <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary p-ml-2" onClick={onHide} />
    </div>
  );
};
