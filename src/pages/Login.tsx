import { useState, useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await auth.login(email, password);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Inicio de sesión exitoso",
        life: 3000,
      });
      navigate("/dashboard"); // Redirige al Dashboard tras el login
    } catch (error) {
      console.error("Error en el login:", error); // Ahora sí usamos la variable error
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Credenciales incorrectas",
        life: 3000,
      });
    }
  };

  return (
    <div className="p-grid p-justify-center p-mt-6">
      <Toast ref={toast} />
      <div className="p-col-12 p-md-4">
        <Card title="🔑 Iniciar Sesión">
          <div className="p-fluid">
            <div className="p-field">
              <label>Email</label>
              <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="p-field">
              <label>Contraseña</label>
              <Password value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
            </div>
            <Button label="Iniciar Sesión" icon="pi pi-sign-in" className="p-button-primary" onClick={handleLogin} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
