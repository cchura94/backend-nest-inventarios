import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Nota } from './entities/nota.entity';
import { Producto } from '../inventario/producto/entities/producto.entity';
import { Almacen } from '../inventario/almacen/entities/almacen.entity';
import { Movimiento } from './entities/movimiento.entity';
import { QueryRunner } from 'typeorm/browser';
import { AlmacenProducto } from '../inventario/almacen/entities/almacen_producto.entity';

@Injectable()
export class NotaService {

  constructor(
    @InjectDataSource()
    private readonly dataSource:DataSource
  ){

  }

  async create(createNotaDto: CreateNotaDto) {

    // trabjar con transacciones
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction()

    try {
      const userRepo = queryRunner.manager.getRepository(User);
      const clienteRepo = queryRunner.manager.getRepository(Cliente);
      const notaRepo = queryRunner.manager.getRepository(Nota);
      const productoRepo = queryRunner.manager.getRepository(Producto);
      const almacenRepo = queryRunner.manager.getRepository(Almacen);
      const movRepo = queryRunner.manager.getRepository(Movimiento);

      const user = await userRepo.findOneBy({id: createNotaDto.user});
      if(!user) throw new NotFoundException('Usuario no encontrado');


      const cliente = await clienteRepo.findOneBy({id: createNotaDto.cliente});
      if(!cliente) throw new NotFoundException('Cliente no encontrado');

      // crear nota

      const nota = await notaRepo.create({
        ...createNotaDto,
        cliente: cliente,
        user: user
      })
      // guardar la nota para obtener el ID para movimientos
      await notaRepo.save(nota);

      const movimientosGuardados:Movimiento[] = []

      for (const m of createNotaDto.movimientos) {
        const producto = await productoRepo.findOneBy({id: m.producto_id});
        if(!producto) throw new NotFoundException('Producto no encontrado');

        const almacen = await almacenRepo.findOneBy({id: m.almacen_id});
        if(!almacen) throw new NotFoundException('Almacen no encontrado');

        const movimiento = movRepo.create({
          ...m,
          nota: nota,
          producto,
          almacen
        });
        await this.actualizarStock(queryRunner, almacen, producto, m.cantidad, m.tipo_movimiento);

        const movGuardado = await movRepo.save(movimiento);
        movimientosGuardados.push(movGuardado)
      }

      nota.movimientos = movimientosGuardados;
      await queryRunner.commitTransaction();

      return nota;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error
    } finally{
      await queryRunner.release()
    }


    return 'This action adds a new nota';
  }

  private async actualizarStock(queryRunner:QueryRunner, almacen:Almacen, producto: Producto, cantidad: number, tipo:'ingreso' | 'salida' | 'devolucion' ){
    const almacenProductoRep = queryRunner.manager.getRepository(AlmacenProducto)

    let ap = await almacenProductoRep.findOne({
      where: {
        almacen: {id: almacen.id},
        producto: {id: producto.id},
      },
      relations: ['almacen', 'producto']
    });
    if(!ap){
      if(tipo === 'salida'){
        throw new BadRequestException('No hay stock registrado para este producto en este amlacen')
      }

      ap = almacenProductoRep.create({
        almacen, producto, cantidad_actual: cantidad, fecha_actualizacion: new Date() 
      })
    }else{
      if(tipo === 'ingreso' || tipo === 'devolucion'){
        ap.cantidad_actual += cantidad;
      }else if(tipo === 'salida'){
        if(ap.cantidad_actual < cantidad){
          throw new BadRequestException('Stock Insuficiente par la salida');
        } 
        ap.cantidad_actual -= cantidad
      }
      ap.fecha_actualizacion = new Date()
    }
    await almacenProductoRep.save(ap);

  }

  findAll() {
    return `This action returns all nota`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nota`;
  }

  update(id: number, updateNotaDto: UpdateNotaDto) {
    return `This action updates a #${id} nota`;
  }

  remove(id: number) {
    return `This action removes a #${id} nota`;
  }
}
