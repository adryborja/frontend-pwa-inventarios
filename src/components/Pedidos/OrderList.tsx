import { useEffect, useRef, useState } from "react";
import { pedidoService } from "../../services/pedidoService";
import { Pedido } from "../../types/types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

export const OrderList: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const toast = useRef<Toast>(null);

  const loadPedidos = async () => {
    try {
      const data = await pedidoService.findAll();
      setPedidos(data);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron cargar los pedidos",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    loadPedidos();
  }, []);

  return (
    <div>
      <Toast ref={toast} />
      <h2>Lista de Pedidos</h2>
      <DataTable value={pedidos} paginator rows={10} responsiveLayout="scroll">
        <Column field="id_pedido" header="ID Pedido" sortable />
        <Column field="id_empresa" header="Empresa" sortable />
        <Column field="fecha_solicitud" header="Fecha Solicitud" sortable />
        <Column field="fecha_entrega" header="Fecha Entrega" sortable />
        <Column field="estado" header="Estado" sortable />
      </DataTable>
    </div>
  );
};
