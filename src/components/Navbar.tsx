import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const items = useMemo(() => [
    { label: "Inicio", icon: "pi pi-home", command: () => navigate("/") },
    { label: "Usuarios", icon: "pi pi-user", command: () => navigate("/usuarios") },
    { label: "Roles", icon: "pi pi-users", command: () => navigate("/roles") },
    { label: "Empresas", icon: "pi pi-building", command: () => navigate("/empresas") },
    { label: "Categorias", icon: "pi pi-box", command: () => navigate("/categorias") },
    { label: "Productos", icon: "pi pi-box", command: () => navigate("/productos") },
    { label: "Inventario", icon: "pi pi-list", command: () => navigate("/inventario") },
    { label: "Movimientos", icon: "pi pi-exchange", command: () => navigate("/movimientos") },
    { label: "Pedidos", icon: "pi pi-shopping-cart", command: () => navigate("/pedidos") },
    { label: "Proveedores", icon: "pi pi-truck", command: () => navigate("/proveedores") },
    { label: "Acerca de", icon: "pi pi-info-circle", command: () => navigate("/acerca-de") },
  ], [navigate]);

  return (
    <div className="navbar-container"> 
      <Menubar model={items} />
    </div>
  );
};

