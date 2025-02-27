import { useState, useEffect, useRef } from "react";
import { usuarioService } from "../../services/usuarioService";
import { empresaService } from "../../services/empresaService";
import { rolService } from "../../services/rolService";
import { Usuario, Empresa, Rol } from "../../types/types";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

interface UserFormProps {
  usuario?: Usuario | null;
  onHide: () => void;
  onSaveSuccess: () => void;  // 🔥 Volvemos a agregar esto
}

export const UserForm: React.FC<UserFormProps> = ({ usuario, onHide, onSaveSuccess }) => {
  const [usuarioData, setUsuarioData] = useState<Partial<Usuario>>({
    nombre_completo: "",
    email: "",
    telefono: "",
    estado: "Activo",
    empresa: null,
    roles: [],
    passwordHash: "",
  });

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (usuario) {
      setUsuarioData(usuario);
    }
    loadEmpresas();
    loadRoles();
  }, [usuario]);

  const loadEmpresas = async () => {
    try {
      const data = await empresaService.findAll();
      setEmpresas(data);
    } catch (error) {
      console.error("Error al cargar empresas:", error);
    }
  };

  const loadRoles = async () => {
    try {
      const data = await rolService.findAll();
      setRoles(data);
    } catch (error) {
      console.error("Error al cargar roles:", error);
    }
  };

  const saveUsuario = async () => {
    try {
      const usuarioPayload: Partial<Usuario> = {
        ...usuarioData,
        empresa: usuarioData.empresa ? { id: usuarioData.empresa.id } : null,
        roles: usuarioData.roles
          ? usuarioData.roles.map((rol) => ({
              id: rol.id,
              nombre: rol.nombre || "",
              fechaCreacion: rol.fechaCreacion || new Date().toISOString(),
            }))
          : [],
      };

      if (usuario && usuario.id) {
        await usuarioService.update(usuario.id, usuarioPayload);
      } else {
        await usuarioService.create(usuarioPayload);
      }

      // ✅ Se llama a onSaveSuccess(), que ya ejecuta loadUsuarios() en UserList.tsx
      if (onSaveSuccess) {
        onSaveSuccess();
      }

      // ✅ Se cierra el modal
      onHide();

    } catch (error) {
      console.error("Error al guardar usuario:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo guardar el usuario",
        life: 3000,
      });
    }
};

  return (
    <div>
      <Toast ref={toast} />
      <h2>{usuario ? "Editar Usuario" : "Nuevo Usuario"}</h2>

      <div className="p-field">
        <label>Nombre Completo:</label>
        <InputText
          value={usuarioData.nombre_completo || ""}
          onChange={(e) => setUsuarioData({ ...usuarioData, nombre_completo: e.target.value })}
        />
      </div>

      <div className="p-field">
        <label>Email:</label>
        <InputText
          value={usuarioData.email || ""}
          onChange={(e) => setUsuarioData({ ...usuarioData, email: e.target.value })}
        />
      </div>

      <div className="p-field">
        <label>Teléfono:</label>
        <InputText
          value={usuarioData.telefono || ""}
          onChange={(e) => setUsuarioData({ ...usuarioData, telefono: e.target.value })}
        />
      </div>

      <div className="p-field">
        <label>Empresa:</label>
        <Dropdown
          value={usuarioData.empresa || null}
          options={empresas}
          optionLabel="nombre"
          placeholder="Seleccione una empresa"
          onChange={(e) => setUsuarioData({ ...usuarioData, empresa: e.value || null })}
        />
      </div>

      <div className="p-field">
        <label>Rol:</label>
        <Dropdown
          value={usuarioData.roles?.[0] || null}
          options={roles}
          optionLabel="nombre"
          placeholder="Seleccione un rol"
          onChange={(e) => setUsuarioData({ ...usuarioData, roles: [e.value] })}
        />
      </div>

      <div className="p-field">
        <label>Estado:</label>
        <Dropdown
          value={usuarioData.estado}
          options={[
            { label: "Activo", value: "Activo" },
            { label: "Inactivo", value: "Inactivo" },
          ]}
          onChange={(e) => setUsuarioData({ ...usuarioData, estado: e.value })}
          placeholder="Seleccione el estado"
        />
      </div>

      <div className="p-field">
        <label>Password Hash:</label>
        <InputText
          value={usuarioData.passwordHash || ""}
          onChange={(e) => setUsuarioData({ ...usuarioData, passwordHash: e.target.value })}
        />
      </div>

      <Button label="Guardar" icon="pi pi-save" className="p-button-success" onClick={saveUsuario} />
      <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary p-ml-2" onClick={onHide} />
    </div>
  );
};