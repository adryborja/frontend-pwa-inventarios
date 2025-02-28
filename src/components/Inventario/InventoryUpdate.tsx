import { useState, useEffect, useRef } from "react";
import { productoService } from "../../services/productoService"; // Ahora usamos `productoService`
import { Producto } from "../../types/types";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

interface InventoryUpdateProps {
  producto?: Producto | null;
  onHide: () => void;
}

export const InventoryUpdate: React.FC<InventoryUpdateProps> = ({ producto, onHide }) => {
  const [stock, setStock] = useState<number>(0);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (producto) {
      setStock(producto.stock_minimo || 0); // Se toma el stock desde Producto
    }
  }, [producto]);

  const updateStock = async (operation: "add" | "remove") => {
    if (!producto) return;

    try {
      const newStock = operation === "add" ? stock + 1 : stock - 1;
      if (newStock < 0) {
        toast.current?.show({ severity: "warn", summary: "Stock inválido", detail: "No se puede tener stock negativo", life: 3000 });
        return;
      }

      await productoService.update(producto.id, { stock_minimo: newStock }); // Ahora se usa `productoService`
      setStock(newStock);
      toast.current?.show({ severity: "success", summary: "Éxito", detail: "Stock actualizado correctamente", life: 3000 });

      onHide();
    } catch (error) {
      console.error("Error al actualizar stock:", error);
      toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar el stock", life: 3000 });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>Actualizar Inventario</h2>
      <div className="p-field">
        <label>Stock Actual:</label>
        <InputNumber value={stock} readOnly />
      </div>
      <div className="p-field">
        <Button label="Agregar Stock" icon="pi pi-plus" className="p-button-success" onClick={() => updateStock("add")} />
        <Button label="Retirar Stock" icon="pi pi-minus" className="p-button-danger p-ml-2" onClick={() => updateStock("remove")} />
      </div>
    </div>
  );
};

