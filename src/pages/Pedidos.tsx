import React, { useState } from "react";
import { OrderList } from "../components/Pedidos/OrderList";
import { OrderForm } from "../components/Pedidos/OrderForm";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export const Pedidos: React.FC = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div>
      <h1>📦 Gestión de Pedidos</h1>
      
      {/* Botón para abrir el formulario */}
      <Button 
        label="Nuevo Pedido" 
        icon="pi pi-plus" 
        className="p-button-success" 
        onClick={() => setMostrarFormulario(true)} 
      />

      {/* Componente para mostrar la lista de pedidos */}
      <OrderList />

      {/* Diálogo para crear un nuevo pedido */}
      <Dialog 
        header="Crear Nuevo Pedido" 
        visible={mostrarFormulario} 
        onHide={() => setMostrarFormulario(false)}
      >
        <OrderForm />
      </Dialog>
    </div>
  );
};

export default Pedidos;
