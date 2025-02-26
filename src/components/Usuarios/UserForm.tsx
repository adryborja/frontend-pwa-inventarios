import { useState, useRef } from "react";
import { usuarioService } from "../../services/usuarioService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

interface UserFormProps {
  onHide: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onHide }) => {
  const [usuario, setUsuario] = useState({
    nombre_completo: "",
    email: "",
    telefono: "",
    estado: "Activo",
  });

  const toast = useRef<Toast>(null);

  const handleSubmit = async () => {
    try {
      await usuarioService.create(usuario);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Usuario creado correctamente",
        life: 3000,
      });

     
      setUsuario({ nombre_completo: "", email: "", telefono: "", estado: "Activo" });

      onHide();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo crear el usuario",
        life: 3000,
      });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>Nuevo Usuario</h2>
      <div className="p-field">
        <label>Nombre Completo:</label>
        <InputText
          value={usuario.nombre_completo}
          onChange={(e) => setUsuario({ ...usuario, nombre_completo: e.target.value })}
        />
      </div>
      <div className="p-field">
        <label>Email:</label>
        <InputText
          value={usuario.email}
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
        />
      </div>
      <div className="p-field">
        <label>Teléfono:</label>
        <InputText
          value={usuario.telefono}
          onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
        />
      </div>
      <Button label="Guardar Usuario" icon="pi pi-save" onClick={handleSubmit} />
    </div>
  );
};


