import React from "react";

export const AcercaDe: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Acerca de esta Aplicación</h1>
      <p className="mt-2">
        Esta aplicación ha sido desarrollada para gestionar el inventario de una empresa, permitiendo el control de productos,
        movimientos de stock, pedidos y proveedores de manera eficiente.
      </p>
      <p className="mt-2">
        Tecnologías utilizadas:
        <ul className="list-disc ml-5">
          <li>React.js con TypeScript</li>
          <li>PrimeReact para los componentes UI</li>
          <li>React Router para la navegación</li>
          <li>Servicios API para la gestión de datos</li>
        </ul>
      </p>
      <p className="mt-2">
        Desarrollado como parte del **Proyecto Integrador de Programación Web**.
      </p>
    </div>
  );
};

export default AcercaDe;
