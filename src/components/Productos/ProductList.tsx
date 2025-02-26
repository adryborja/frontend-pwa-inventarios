import { useEffect, useState, useRef } from "react";
import { Producto } from "../../types/types";
import { productoService } from "../../services/productoService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

export const ProductList: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const toast = useRef<Toast>(null);

  const loadProductos = async () => {
    try {
      const data = await productoService.findAll();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error); // ✅ Ahora usamos 'error'
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Error al cargar los productos",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    loadProductos();
  }, []);

  return (
    <div>
      <Toast ref={toast} />
      <h2>Lista de Productos</h2>
      <DataTable value={productos} paginator rows={10} responsiveLayout="scroll">
        <Column field="id_producto" header="ID" sortable />
        <Column field="codigo_barras" header="Código de Barras" sortable />
        <Column field="nombre" header="Nombre" sortable />
        <Column field="descripcion" header="Descripción" sortable />
        <Column field="precio_compra" header="Precio de Compra" sortable />
        <Column field="precio_venta" header="Precio de Venta" sortable />
        <Column field="stock_minimo" header="Stock Mínimo" sortable />
        <Column field="stock_maximo" header="Stock Máximo" sortable />
        <Column
          field="fecha_creacion"
          header="Fecha de Creación"
          sortable
          body={(rowData) => new Date(rowData.fecha_creacion).toLocaleString()}
        />
      </DataTable>
    </div>
  );
};


