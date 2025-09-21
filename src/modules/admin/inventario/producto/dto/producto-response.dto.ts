export class CategoriaDto{
    id: number;
    nombre: string;
    descripcion?: string;
}

export class ProductoResponseDto{
    id: number;
    nombre: string;
    descripcion: string;
    codigo_barra: string;
    unidad_medida: string;
    marca: string;
    precio_venta_actual: number;
    imagen: string;
    estado: boolean;
    categoria: CategoriaDto
}