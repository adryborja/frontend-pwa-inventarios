import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

interface MovementFilterProps {
  onFilter: (filtro: { tipo: string; producto: string }) => void;
}

export const MovementFilter: React.FC<MovementFilterProps> = ({ onFilter }) => {
  const [tipo, setTipo] = useState<string>("");
  const [producto, setProducto] = useState<string>("");

  const tiposMovimientos = [
    { label: "Todos", value: "" },
    { label: "Entrada", value: "entrada" },
    { label: "Salida", value: "salida" },
  ];

  const handleFilter = () => {
    onFilter({ tipo, producto });
  };

  return (
    <div>
      <h3>Filtrar Movimientos</h3>
      <Dropdown
        value={tipo}
        options={tiposMovimientos}
        placeholder="Seleccione un tipo"
        onChange={(e) => setTipo(e.value)}
      />
      <InputText
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
        placeholder="Buscar por producto"
      />
      <Button label="Filtrar" icon="pi pi-search" onClick={handleFilter} />
    </div>
  );
};
