import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PanelMenu } from "primereact/panelmenu";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  // Definir las rutas del menú lateral
  const items = useMemo(() => [
    {
      label: "Inicio",
      icon: "pi pi-home",
      command: () => navigate("/")
    },
    {
      label: "Gestión de Usuarios",
      icon: "pi pi-user",
      items: [
        { label: "Usuarios", icon: "pi pi-users", command: () => navigate("/usuarios") },
        { label: "Roles", icon: "pi pi-id-card", command: () => navigate("/roles") } // ✅ Agregado
      ]
    },
    {
      label: "Productos e Inventario",
      icon: "pi pi-box",
      items: [
        { label: "Productos", icon: "pi pi-box", command: () => navigate("/productos") },
        { label: "Inventario", icon: "pi pi-list", command: () => navigate("/inventario") }
      ]
    },
    {
      label: "Movimientos",
      icon: "pi pi-exchange",
      command: () => navigate("/movimientos")
    },
    {
      label: "Pedidos y Proveedores",
      icon: "pi pi-shopping-cart",
      items: [
        { label: "Pedidos", icon: "pi pi-shopping-cart", command: () => navigate("/pedidos") },
        { label: "Proveedores", icon: "pi pi-truck", command: () => navigate("/proveedores") }
      ]
    },
    {
      label: "Acerca de",
      icon: "pi pi-info-circle",
      command: () => navigate("/acerca-de")
    }
  ], [navigate]);

  return (
    <div className="sidebar-container">
      <PanelMenu model={items} />
    </div>
  );
};

