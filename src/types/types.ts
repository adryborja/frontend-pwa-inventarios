export interface Rol {
    id: number;
    nombre: string;
    descripcion?: string;
    fechaCreacion: string;
}

export interface Usuario {
    id_usuario: number;
    nombre_completo: string;
    email: string;
    telefono?: string;
    estado: string;
    fecha_creacion: string;
    ultima_conexion?: string;
    password_hash: string;
    id_empresa: number;
    roles?: Rol[];
}

export interface Empresa {
    id_empresa: number;
    nombre: string;
    ruc: string;
    direccion: string;
    telefono: string;
    email_contacto: string;
    sector: string;
    fecha_creacion: string;
    estado: string;
}

export interface Proveedor {
    id_proveedor: number;
    nombre: string;
    contacto: string;
    telefono: string;
    email: string;
    direccion: string;
    fecha_creacion: string;
}

export interface Categoria {
    id_categoria: number;
    nombre: string;
    descripcion?: string;
    fecha_creacion: string;
}

export interface Producto {
    id_producto: number;
    codigo_barras: string;
    nombre: string;
    descripcion: string;
    id_categoria: number;
    precio_compra: number;
    precio_venta: number;
    stock_minimo: number;
    stock_maximo: number;
    id_empresa: number;
    id_proveedor: number;
    fecha_creacion: string;
    ultima_actualizacion: string;
}

export interface Inventario {
    id_inventario: number;
    id_empresa: number;
    fecha_actualizacion: string;
}

export interface MovimientoInventario {
    id_movimiento: number;
    id_producto: number;
    tipo_movimiento: string;
    cantidad: number;
    fecha_movimiento: string;
    motivo: string;
    id_usuario: number;
    costo_unitario: number;
    ubicacion: string;
}

export interface Reporte {
    id_reporte: number;
    id_empresa: number;
    tipo: string;
    fecha_generacion: string;
    archivo_pdf: string;
    id_usuario: number;
}

export interface AlertaStock {
    id_alerta: number;
    id_producto: number;
    nivel_minimo: number;
    estado: string;
    fecha_creacion: string;
}

export interface Pedido {
    id_pedido: number;
    id_empresa: number;
    fecha_solicitud: string;
    fecha_entrega?: Date | null;
    estado: string;
}

export interface DetallePedido {
    id_detalle_pedido: number;
    id_pedido: number;
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
}
