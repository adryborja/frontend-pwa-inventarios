import { useState, useRef } from "react";
import { authService } from "../services/authService";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

export const Register: React.FC = () => {
  const [usuario, setUsuario] = useState({
    nombre_completo: "",
    email: "",
    telefono: "",
    password: "",
  });

  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await authService.register(usuario);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Registro exitoso, ahora puedes iniciar sesión",
        life: 3000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error en el registro:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo completar el registro",
        life: 3000,
      });
    }
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center" style={{ height: "100vh" }}>
      <Toast ref={toast} />
      <div className="p-card p-shadow-4 p-p-4" style={{ width: "400px" }}>
        <h2>Registro</h2>

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

        <div className="p-field">
          <label>Contraseña:</label>
          <Password
            value={usuario.password}
            onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
            toggleMask
          />
        </div>

        <Button label="Registrarse" icon="pi pi-user-plus" className="p-button-success p-mt-2" onClick={handleRegister} />
      </div>
    </div>
  );
};

export default Register;