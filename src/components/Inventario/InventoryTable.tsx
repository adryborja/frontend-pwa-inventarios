import { useEffect, useState, useRef } from "react";
import { productoService } from "../../services/productoService"; // ✅ Usamos `productoService`
import { Producto } from "../../types/types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InventoryUpdate } from "./InventoryUpdate";

export const InventoryTable: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
  const [displayDialog, setDisplayDialog] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const data = await productoService.findAll();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      toast.current?.show({ severity: "error", summary: "Error", detail: "Error al cargar los productos", life: 3000 });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>Gestión de Inventario</h2>

      <DataTable value={productos} paginator rows={5}>
        <Column field="id_producto" header="ID" />
        <Column field="nombre" header="Producto" />
        <Column field="stock_minimo" header="Stock Mínimo" />
        <Column field="stock_maximo" header="Stock Máximo" />
        <Column
          header="Actualizar Stock"
          body={(rowData: Producto) => (
            <Button
              icon="pi pi-refresh"
              className="p-button-rounded p-button-info"
              onClick={() => {
                setSelectedProducto(rowData);
                setDisplayDialog(true);
              }}
            />
          )}
        />
      </DataTable>

      <Dialog header="Actualizar Inventario" visible={displayDialog} onHide={() => setDisplayDialog(false)}>
        {selectedProducto && (
          <InventoryUpdate
            producto={selectedProducto} // ✅ Ahora pasamos `producto`, no `inventarioData`
            onHide={() => {
              setDisplayDialog(false);
              loadProductos();
            }}
          />
        )}
      </Dialog>
    </div>
  );
};
