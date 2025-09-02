import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Almacen } from "../../almacen/entities/almacen.entity";

@Entity('sucursales')
export class Sucursal {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    nombre: string;

    @Column({length: 255})
    direccion:string;

    @Column({length: 100})
    ciudad: string;

    @OneToMany(() => Almacen, alm => alm.sucursal)
    almacenes: Almacen[]
}
