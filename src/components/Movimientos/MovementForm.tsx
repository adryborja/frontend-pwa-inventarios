import { useState, useRef } from "react";
import { movimientoService } from "../../services/movimientoService";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export const MovementForm: React.FC = () => {
  const [movimiento, setMovimiento] = useState({
    tipo_movimiento: "",
    cantidad: 0,
    id_producto: 0, // ✅ Cambiado de string a number
    motivo: "",
    costo_unitario: 0,
    ubicacion: "",
    id_usuario: 0, // ✅ Cambiado de string a number
  });

  const toast = useRef<Toast>(null);

  const tiposMovimiento = [
    { label: "Entrada", value: "entrada" },
    { label: "Salida", value: "salida" },
    { label: "Ajuste", value: "ajuste" },
  ];

  const handleSubmit = async () => {
    try {
      await movimientoService.create({
        ...movimiento,
        id_producto: Number(movimiento.id_producto), // ✅ Convertido a número
        id_usuario: Number(movimiento.id_usuario), // ✅ Convertido a número
      });
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Movimiento registrado correctamente",
        life: 3000,
      });
      setMovimiento({
        tipo_movimiento: "",
        cantidad: 0,
        id_producto: 0,
        motivo: "",
        costo_unitario: 0,
        ubicacion: "",
        id_usuario: 0,
      });
    } catch (error) {
      console.error("Error al registrar el movimiento:", error); // ✅ Ahora usamos `console.error(error);`
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo registrar el movimiento",
        life: 3000,
      });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>Registrar Movimiento</h2>

      <div className="p-field">
        <label>Tipo de Movimiento:</label>
        <Dropdown
          value={movimiento.tipo_movimiento}
          options={tiposMovimiento}
          onChange={(e) => setMovimiento({ ...movimiento, tipo_movimiento: e.value })}
          placeholder="Seleccione un tipo"
        />
      </div>

      <div className="p-field">
        <label>Cantidad:</label>
        <InputNumber
          value={movimiento.cantidad}
          onValueChange={(e) => setMovimiento({ ...movimiento, cantidad: e.value || 0 })}
        />
      </div>

      <div className="p-field">
        <label>ID Producto:</label>
        <InputNumber
          value={movimiento.id_producto}
          onValueChange={(e) => setMovimiento({ ...movimiento, id_producto: e.value || 0 })}
        />
      </div>

      <div className="p-field">
        <label>Motivo:</label>
        <InputText
          value={movimiento.motivo}
          onChange={(e) => setMovimiento({ ...movimiento, motivo: e.target.value })}
        />
      </div>

      <div className="p-field">
        <label>Costo Unitario:</label>
        <InputNumber
          value={movimiento.costo_unitario}
          onValueChange={(e) => setMovimiento({ ...movimiento, costo_unitario: e.value || 0 })}
        />
      </div>

      <div className="p-field">
        <label>Ubicación:</label>
        <InputText
          value={movimiento.ubicacion}
          onChange={(e) => setMovimiento({ ...movimiento, ubicacion: e.target.value })}
        />
      </div>

      <div className="p-field">
        <label>ID Usuario:</label>
        <InputNumber
          value={movimiento.id_usuario}
          onValueChange={(e) => setMovimiento({ ...movimiento, id_usuario: e.value || 0 })}
        />
      </div>

      <Button label="Guardar Movimiento" icon="pi pi-save" onClick={handleSubmit} />
    </div>
  );
};
