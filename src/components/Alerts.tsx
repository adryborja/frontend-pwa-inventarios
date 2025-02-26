import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

export const Alerts: React.FC = () => {
  const toast = useRef<Toast>(null);

  // Función para mostrar alertas dinámicas
  const showAlert = (severity: "success" | "warn" | "error", summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
  };

  return (
    <div className="alerts-container">
      <Toast ref={toast} position="top-right" />

      <Button
        label="Stock Bajo"
        icon="pi pi-exclamation-triangle"
        className="p-button-warning"
        onClick={() => showAlert("warn", "Stock Bajo", "Algunos productos están por agotarse")}
      />

      <Button
        label="Operación Exitosa"
        icon="pi pi-check"
        className="p-button-success"
        onClick={() => showAlert("success", "Éxito", "La operación se completó correctamente")}
      />

      <Button
        label="Error en Pedido"
        icon="pi pi-times"
        className="p-button-danger"
        onClick={() => showAlert("error", "Error", "Hubo un problema con el pedido")}
      />
    </div>
  );
};
