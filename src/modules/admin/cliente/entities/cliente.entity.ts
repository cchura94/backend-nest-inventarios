import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: 'cliente' | 'proveedor'

    @Column({length: 255})
    razon_social: string;

    @Column({length: 100, nullable: true})
    ci_nit_ruc_rut: string;

    @Column({length: 20, nullable: true})
    telefono: string;

    @Column({length: 255, nullable: true})
    direccion: string;

    @Column({length: 200, nullable: true})
    correo: string;

    @Column()
    estado: boolean;
   
}
