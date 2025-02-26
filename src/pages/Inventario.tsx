import React from "react";
import { Card } from "primereact/card";
import { InventoryTable } from "../components/Inventario/InventoryTable";

export const Inventario: React.FC = () => {
  return (
    <div className="p-grid p-justify-center p-m-4">
      <div className="p-col-12">
        <Card title="📦 Gestión de Inventario">
          <p>Consulta y administra el stock de productos en el inventario.</p>
          <InventoryTable />
        </Card>
      </div>
    </div>
  );
};

export default Inventario;
