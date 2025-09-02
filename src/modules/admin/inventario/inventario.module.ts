import { Module } from '@nestjs/common';
import { CategoriaModule } from './categoria/categoria.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { AlmacenModule } from './almacen/almacen.module';

@Module({
  imports: [CategoriaModule, SucursalModule, AlmacenModule]
})
export class InventarioModule {}
