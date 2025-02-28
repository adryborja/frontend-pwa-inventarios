import { useEffect, useState, useRef } from "react";
import { productoService } from "../../services/productoService";
import { empresaService } from "../../services/empresaService";
import { Producto, Empresa } from "../../types/types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InventoryUpdate } from "./InventoryUpdate";
import { Alerts } from "../Alerts";

export const InventoryTable: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    loadProductos();
    loadEmpresas();
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

  const loadEmpresas = async () => {
    try {
      const data = await empresaService.findAll();
      setEmpresas(data);
    } catch (error) {
      console.error("Error al cargar empresas:", error);
      toast.current?.show({ severity: "error", summary: "Error", detail: "Error al cargar las empresas", life: 3000 });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>Gestión de Inventario</h2>
      


      <DataTable value={productos} paginator rows={5} responsiveLayout="scroll">
        <Column field="id" header="ID" />
        <Column field="nombre" header="Producto" />
        <Column 
          header="Empresa"
          body={(rowData: Producto) => rowData.empresa?.nombre || "Sin empresa"}
          sortable
        />
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
      

      <Dialog 
        header="Actualizar Inventario" 
        visible={displayDialog} 
        onHide={() => setDisplayDialog(false)}
      >
        {selectedProducto && (
          <InventoryUpdate
            producto={selectedProducto}
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