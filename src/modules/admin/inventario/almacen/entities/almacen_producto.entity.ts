import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Almacen } from "./almacen.entity";
import { Producto } from "../../producto/entities/producto.entity";

@Entity('almacen_producto')
export class AlmacenProducto{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    cantidad_actual: number;

    @Column({type: 'date'})
    fecha_actualizacion: Date;

    @ManyToOne(() => Almacen, alm => alm.productos, {eager: true})
    almacen: Almacen;

    @ManyToOne(() => Producto, prod => prod.almacenes, {eager: true})
    producto: Producto;

}