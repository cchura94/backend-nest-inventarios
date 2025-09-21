import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';
import { Almacen } from './entities/almacen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlmacenService {
   constructor(
     @InjectRepository(Almacen)
     private readonly almacenRepository: Repository<Almacen>
   ){}
 
   create(createAlmacenDto: CreateAlmacenDto) {
     const almacen = this.almacenRepository.create(createAlmacenDto);
     return this.almacenRepository.save(almacen);
   }
 
   findAll() {
     return this.almacenRepository.find();
   }
 
   async findOne(id: number) {
     const almacen = await this.almacenRepository.findOneBy({id});
     if(!almacen) throw new NotFoundException('El almacen no existe'); 
     return almacen;
   }
 
   async update(id: number, updateAlmacenDto: UpdateAlmacenDto) {
     const almacen = await this.findOne(id);
     this.almacenRepository.merge(almacen, updateAlmacenDto);
     return this.almacenRepository.save(almacen);
   }
 
   async remove(id: number) {
     const almacen = await this.findOne(id);
     // await this.sucursalRepository.remove(sucursal);
   }
}
