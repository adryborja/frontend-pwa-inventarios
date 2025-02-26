import { useEffect, useState, useRef } from "react";
import { MovimientoInventario, Producto } from "../../types/types";
import { movimientoService } from "../../services/movimientoService";
import { productoService } from "../../services/productoService"; 
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

interface MovementHistoryProps {
  filtro: { tipo_movimiento?: string; producto?: string };
}

export const MovementHistory: React.FC<MovementHistoryProps> = ({ filtro }) => {
  const [movimientos, setMovimientos] = useState<MovimientoInventario[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const toast = useRef<Toast>(null);


  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosData = await productoService.findAll();
        setProductos(productosData);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

 
  const loadMovimientos = async () => {
    try {
      const data = await movimientoService.findAll();

     
      const movimientosFiltrados = data.filter((mov) =>
        (!filtro.tipo_movimiento || mov.tipo_movimiento === filtro.tipo_movimiento) &&
        (!filtro.producto || productos.find((p) => p.id_producto === mov.id_producto)?.nombre.includes(filtro.producto))
      );

      setMovimientos(movimientosFiltrados);
    } catch (error) {
      console.error("Error al cargar los movimientos:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Error al cargar los movimientos",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    loadMovimientos();
  }, [filtro, productos]); 

  return (
    <div>
      <Toast ref={toast} />
      <h2>Historial de Movimientos</h2>
      <DataTable value={movimientos} paginator rows={10} responsiveLayout="scroll">
        <Column field="id_movimiento" header="ID" sortable />
        <Column field="tipo_movimiento" header="Tipo" sortable />
        <Column field="cantidad" header="Cantidad" sortable />
        <Column 
          field="id_producto" 
          header="Producto" 
          sortable 
          body={(rowData) => productos.find((p) => p.id_producto === rowData.id_producto)?.nombre || "Desconocido"}
        />
        <Column 
          field="fecha_movimiento" 
          header="Fecha" 
          sortable 
          body={(rowData) => new Date(rowData.fecha_movimiento).toLocaleString()} 
        />
        <Column field="motivo" header="Motivo" sortable />
        <Column field="id_usuario" header="Usuario" sortable />
        <Column field="costo_unitario" header="Costo Unitario" sortable />
        <Column field="ubicacion" header="Ubicación" sortable />
      </DataTable>
    </div>
  );
};



