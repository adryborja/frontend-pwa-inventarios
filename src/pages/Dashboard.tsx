import React from "react";
import { Alerts } from "../components/Alerts";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

export const Dashboard: React.FC = () => {
  return (
    <div className="p-grid p-m-4">
      <h1 className="p-col-12">📊 Panel de Control</h1>
      <Alerts />
      <p className="p-col-12">Bienvenido al sistema de gestión de inventario.</p>

      <Divider />

      {/* Sección de estadísticas */}
      <div className="p-grid p-col-12 p-justify-between">
        <Card className="p-col-4 p-shadow-3">
          <h2>Productos</h2>
          <p className="p-text-bold">150</p>
        </Card>
        <Card className="p-col-4 p-shadow-3">
          <h2>Movimientos</h2>
          <p className="p-text-bold">320</p>
        </Card>
        <Card className="p-col-4 p-shadow-3">
          <h2>Pedidos Pendientes</h2>
          <p className="p-text-bold">12</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

