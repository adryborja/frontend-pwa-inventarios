import { useState } from "react";
import { SupplierList } from "../components/Proveedores/SupplierList";
import { SupplierForm } from "../components/Proveedores/SupplierForm";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export const Proveedores: React.FC = () => {
  const [displayDialog, setDisplayDialog] = useState(false);

  return (
    <div>
      <h1>🚚 Gestión de Proveedores</h1>
      <Button label="Nuevo Proveedor" icon="pi pi-plus" className="p-button-success" onClick={() => setDisplayDialog(true)} />
      
      <SupplierList />

      <Dialog header="Agregar Proveedor" visible={displayDialog} onHide={() => setDisplayDialog(false)}>
        <SupplierForm onHide={() => setDisplayDialog(false)} onSave={() => {}} />
      </Dialog>
    </div>
  );
};
export default Proveedores;