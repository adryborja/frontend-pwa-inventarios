import React, { useState } from "react";
import { ProductList } from "../components/Productos/ProductList";
import { ProductForm } from "../components/Productos/ProductForm";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export const Productos: React.FC = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div>
      <h1>📦 Gestión de Productos</h1>

      {/* Botón para abrir el formulario */}
      <Button
        label="Nuevo Producto"
        icon="pi pi-plus"
        className="p-button-success"
        onClick={() => setMostrarFormulario(true)}
      />

      {/* Componente para mostrar la lista de productos */}
      <ProductList />

      {/* Diálogo para agregar o editar productos */}
      <Dialog
        header="Agregar/Editar Producto"
        visible={mostrarFormulario}
        onHide={() => setMostrarFormulario(false)}
      >
        <ProductForm onHide={() => setMostrarFormulario(false)} />
      </Dialog>
    </div>
  );
};

export default Productos;
