import { useState, useEffect } from "react";
import { Producto } from "../../types/types";
import { productoService } from "../../services/productoService";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { CategorySelector } from "./CategorySelector";

interface ProductFormProps {
  producto?: Producto | null;
  onHide: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ producto, onHide }) => {
  const [productData, setProductData] = useState<Partial<Producto>>({});

  useEffect(() => {
    if (producto) setProductData(producto);
    else setProductData({});
  }, [producto]);

  const saveProducto = async () => {
    try {
      if (productData.id_producto) {
        await productoService.update(productData.id_producto, productData);
      } else {
        await productoService.create(productData);
      }
      onHide();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  return (
    <div>
      <div className="p-field">
        <label>Nombre:</label>
        <InputText
          value={productData.nombre || ""}
          onChange={(e) => setProductData({ ...productData, nombre: e.target.value })}
        />
      </div>
      <div className="p-field">
        <label>Descripción:</label>
        <InputText
          value={productData.descripcion || ""}
          onChange={(e) => setProductData({ ...productData, descripcion: e.target.value })}
        />
      </div>
      <div className="p-field">
        <label>Precio Compra:</label>
        <InputNumber
          value={productData.precio_compra || 0}
          onValueChange={(e) => setProductData({ ...productData, precio_compra: e.value || 0 })}
        />
      </div>
      <div className="p-field">
        <label>Precio Venta:</label>
        <InputNumber
          value={productData.precio_venta || 0}
          onValueChange={(e) => setProductData({ ...productData, precio_venta: e.value || 0 })}
        />
      </div>
      <div className="p-field">
        <label>Stock Mínimo:</label>
        <InputNumber
          value={productData.stock_minimo || 0}
          onValueChange={(e) => setProductData({ ...productData, stock_minimo: e.value || 0 })}
        />
      </div>
      <div className="p-field">
        <label>Stock Máximo:</label>
        <InputNumber
          value={productData.stock_maximo || 0}
          onValueChange={(e) => setProductData({ ...productData, stock_maximo: e.value || 0 })}
        />
      </div>

      <div className="p-field">
        <label>Categoría:</label>
        <CategorySelector
          selectedCategory={productData.id_categoria || null}
          onSelect={(id) => setProductData({ ...productData, id_categoria: id })}
        />
      </div>

      <Button label="Guardar" icon="pi pi-save" className="p-button-success" onClick={saveProducto} />
      <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary p-ml-2" onClick={onHide} />
    </div>
  );
};
