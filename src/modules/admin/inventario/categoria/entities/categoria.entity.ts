import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categorias')
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    nombre: string;

    @Column({type: 'text', nullable: true})
    descripcion: string;

}
