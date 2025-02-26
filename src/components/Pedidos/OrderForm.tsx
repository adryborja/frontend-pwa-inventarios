import { useState, useRef, useEffect } from "react";
import { pedidoService } from "../../services/pedidoService";
import { empresaService } from "../../services/empresaService";
import { Pedido, Empresa } from "../../types/types";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export const OrderForm: React.FC = () => {
  const [pedido, setPedido] = useState<Partial<Pedido>>({
    id_empresa: undefined,
    fecha_entrega: null,
    estado: "",
  });
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const loadEmpresas = async () => {
      try {
        const data = await empresaService.findAll();
        setEmpresas(data);
      } catch (error) {
        console.error("Error al cargar empresas:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudieron cargar las empresas",
          life: 3000,
        });
      }
    };
    loadEmpresas();
  }, []);

  const handleSubmit = async () => {
    try {
      await pedidoService.create({
        ...pedido,
        fecha_entrega: pedido.fecha_entrega ? new Date(pedido.fecha_entrega) : null,
      });
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Pedido guardado correctamente",
        life: 3000,
      });
      setPedido({ id_empresa: undefined, fecha_entrega: null, estado: "" });
    } catch (error) {
      console.error("Error al guardar pedido:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo guardar el pedido",
        life: 3000,
      });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>Nuevo Pedido</h2>
      <div className="p-field">
        <label>Empresa:</label>
        <Dropdown
          value={pedido.id_empresa}
          options={empresas}
          optionLabel="nombre"
          onChange={(e) => setPedido({ ...pedido, id_empresa: e.value })}
          placeholder="Seleccione una empresa"
        />
      </div>
      <div className="p-field">
        <label>Fecha de Entrega:</label>
        <Calendar
          value={pedido.fecha_entrega || null}
          onChange={(e) => setPedido({ ...pedido, fecha_entrega: e.value as Date })}
          dateFormat="dd/mm/yy"
          showIcon
        />
      </div>
      <div className="p-field">
        <label>Estado:</label>
        <Dropdown
          value={pedido.estado}
          options={[
            { label: "Pendiente", value: "Pendiente" },
            { label: "Entregado", value: "Entregado" },
            { label: "Cancelado", value: "Cancelado" },
          ]}
          onChange={(e) => setPedido({ ...pedido, estado: e.value })}
          placeholder="Seleccione el estado"
        />
      </div>
      <Button label="Guardar Pedido" icon="pi pi-save" onClick={handleSubmit} />
    </div>
  );
};
