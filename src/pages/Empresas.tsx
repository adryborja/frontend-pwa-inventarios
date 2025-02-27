import { useEffect, useState, useRef } from "react";
import { empresaService } from "../services/empresaService";
import { Empresa } from "../types/types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const Empresas: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [displayDialog, setDisplayDialog] = useState<boolean>(false);
  const [nuevaEmpresa, setNuevaEmpresa] = useState<Partial<Empresa>>({
    nombre: "",
    ruc: "",
    direccion: "",
    telefono: "",
    email_contacto: "",
    sector: "",
    estado: "Activo",
  });
  const toast = useRef<Toast>(null);

  useEffect(() => {
    loadEmpresas();
  }, []);

  const loadEmpresas = async () => {
    try {
      const data = await empresaService.findAll();
      setEmpresas(data);
    } catch (error) {
      console.error("Error al cargar empresas:", error);
      toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudieron cargar las empresas", life: 3000 });
    }
  };

  const saveEmpresa = async () => {
    try {
      if (selectedEmpresa) {
        await empresaService.update(selectedEmpresa.id, nuevaEmpresa);
        toast.current?.show({ severity: "success", summary: "Éxito", detail: "Empresa actualizada correctamente", life: 3000 });
      } else {
        await empresaService.create(nuevaEmpresa);
        toast.current?.show({ severity: "success", summary: "Éxito", detail: "Empresa creada correctamente", life: 3000 });
      }
      setDisplayDialog(false);
      loadEmpresas();
    } catch (error) {
      console.error("Error al guardar empresa:", error);
      toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo guardar la empresa", life: 3000 });
    }
  };

  const deleteEmpresa = async (id: number) => {
    try {
      await empresaService.remove(id);
      setEmpresas((prevEmpresas) => prevEmpresas.filter((empresa) => empresa.id !== id));
      toast.current?.show({ severity: "success", summary: "Éxito", detail: "Empresa eliminada correctamente", life: 3000 });
    } catch (error) {
      console.error("Error al eliminar empresa:", error);
      toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo eliminar la empresa", life: 3000 });
    }
  };

  const estados = [
    { label: "Activo", value: "Activo" },
    { label: "Inactivo", value: "Inactivo" }
  ];

  return (
    <div>
      <Toast ref={toast} />
      <h1>Gestión de Empresas</h1>

      <Button
        label="Agregar Empresa"
        icon="pi pi-plus"
        className="p-button-success p-mb-3"
        onClick={() => {
          setNuevaEmpresa({ nombre: "", ruc: "", direccion: "", telefono: "", email_contacto: "", sector: "", estado: "Activo" });
          setSelectedEmpresa(null);
          setDisplayDialog(true);
        }}
      />

      <DataTable value={empresas} paginator rows={5} responsiveLayout="scroll">
        <Column field="id" header="ID" sortable />
        <Column field="nombre" header="Nombre" sortable />
        <Column field="ruc" header="RUC" sortable />
        <Column field="direccion" header="Dirección" sortable />
        <Column field="telefono" header="Teléfono" sortable />
        <Column field="email_contacto" header="Email de Contacto" sortable />
        <Column field="sector" header="Sector" sortable />
        <Column field="estado" header="Estado" sortable />
        <Column field="fechaCreacion" header="Fecha de Creación" sortable body={(rowData) => new Date(rowData.fechaCreacion).toLocaleDateString()} />
        <Column
          header="Acciones"
          body={(rowData: Empresa) => (
            <div>
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-warning p-mr-2"
                onClick={() => {
                  setNuevaEmpresa(rowData);
                  setSelectedEmpresa(rowData);
                  setDisplayDialog(true);
                }}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => deleteEmpresa(rowData.id)}
              />
            </div>
          )}
        />
      </DataTable>

      <Dialog
        header={selectedEmpresa ? "Editar Empresa" : "Nueva Empresa"}
        visible={displayDialog}
        onHide={() => setDisplayDialog(false)}
      >
        <div className="p-field">
          <label>Nombre:</label>
          <InputText
            value={nuevaEmpresa.nombre || ""}
            onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, nombre: e.target.value })}
          />
        </div>
        <div className="p-field">
          <label>RUC:</label>
          <InputText
            value={nuevaEmpresa.ruc || ""}
            onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, ruc: e.target.value })}
          />
        </div>
        <div className="p-field">
          <label>Dirección:</label>
          <InputText
            value={nuevaEmpresa.direccion || ""}
            onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, direccion: e.target.value })}
          />
        </div>
        <div className="p-field">
          <label>Teléfono:</label>
          <InputText
            value={nuevaEmpresa.telefono || ""}
            onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, telefono: e.target.value })}
          />
        </div>
        <div className="p-field">
          <label>Email de Contacto:</label>
          <InputText
            value={nuevaEmpresa.email_contacto || ""}
            onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, email_contacto: e.target.value })}
          />
        </div>
        <div className="p-field">
          <label>Sector:</label>
          <InputText
            value={nuevaEmpresa.sector || ""}
            onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, sector: e.target.value })}
          />
        </div>
        <div className="p-field">
          <label>Estado:</label>
          <Dropdown
            value={nuevaEmpresa.estado}
            options={estados}
            onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, estado: e.value })}
            placeholder="Seleccione un estado"
          />
        </div>
        <Button label="Guardar" icon="pi pi-save" className="p-button-success" onClick={saveEmpresa} />
      </Dialog>
    </div>
  );
};

export default Empresas;
