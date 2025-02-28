import { useState, useRef, useEffect } from "react";
import { pedidoService } from "../../services/pedidoService";
import { empresaService } from "../../services/empresaService";
import { Pedido, Empresa } from "../../types/types";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

interface OrderFormProps {
  onSaveSuccess?: () => void;
  onHide?: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onSaveSuccess, onHide }) => {
  const [pedido, setPedido] = useState<Partial<Pedido>>({
    empresa: null,
    fecha_entrega: null,
    estado: "Pendiente",
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
      // Validate required fields
      if (!pedido.empresa) {
        toast.current?.show({
          severity: "warn",
          summary: "Advertencia",
          detail: "Por favor seleccione una empresa",
          life: 3000,
        });
        return;
      }

      if (!pedido.fecha_entrega) {
        toast.current?.show({
          severity: "warn",
          summary: "Advertencia",
          detail: "Por favor seleccione una fecha de entrega",
          life: 3000,
        });
        return;
      }

      if (!pedido.estado) {
        toast.current?.show({
          severity: "warn",
          summary: "Advertencia",
          detail: "Por favor seleccione un estado",
          life: 3000,
        });
        return;
      }

      // Create the pedido
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

      // Reset form
      setPedido({
        empresa: null,
        fecha_entrega: null,
        estado: "Pendiente",
      });

      // Call onSaveSuccess if provided
      if (onSaveSuccess) {
        onSaveSuccess();
      }

      // Close the dialog if onHide is provided
      if (onHide) {
        onHide();
      }
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

      <div className="p-field mb-3">
        <label className="block mb-1">Empresa:</label>
        <Dropdown
          value={pedido.empresa}
          options={empresas}
          optionLabel="nombre"
          onChange={(e) => setPedido({ ...pedido, empresa: e.value })}
          placeholder="Seleccione una empresa"
          className="w-full"
        />
      </div>

      <div className="p-field mb-3">
        <label className="block mb-1">Fecha de Entrega:</label>
        <Calendar
          value={pedido.fecha_entrega || null}
          onChange={(e) => setPedido({ ...pedido, fecha_entrega: e.value as Date })}
          dateFormat="dd/mm/yy"
          showIcon
          className="w-full"
        />
      </div>

      <div className="p-field mb-3">
        <label className="block mb-1">Estado:</label>
        <Dropdown
          value={pedido.estado}
          options={[
            { label: "Pendiente", value: "Pendiente" },
            { label: "Entregado", value: "Entregado" },
            { label: "Cancelado", value: "Cancelado" },
          ]}
          onChange={(e) => setPedido({ ...pedido, estado: e.value })}
          placeholder="Seleccione el estado"
          className="w-full"
        />
      </div>

      <div className="p-d-flex p-jc-end mt-4">
        <Button 
          label="Guardar Pedido" 
          icon="pi pi-save" 
          className="p-button-success" 
          onClick={handleSubmit} 
        />
        {onHide && (
          <Button 
            label="Cancelar" 
            icon="pi pi-times" 
            className="p-button-secondary ml-2" 
            onClick={onHide} 
          />
        )}
      </div>
    </div>
  );
};