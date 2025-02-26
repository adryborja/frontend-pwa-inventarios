import React, { useState } from "react";
import { UserList } from "../components/Usuarios/UserList";
import { UserForm } from "../components/Usuarios/UserForm";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export const Usuarios: React.FC = () => {
  const [displayDialog, setDisplayDialog] = useState<boolean>(false);

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      
      <Button
        label="Agregar Usuario"
        icon="pi pi-user-plus"
        className="p-button-success p-mb-3"
        onClick={() => setDisplayDialog(true)}
      />
      
      <UserList />

      <Dialog
        header="Nuevo Usuario"
        visible={displayDialog}
        onHide={() => setDisplayDialog(false)}
      >
        <UserForm onHide={() => setDisplayDialog(false)} />
      </Dialog>
    </div>
  );
};

export default Usuarios;
