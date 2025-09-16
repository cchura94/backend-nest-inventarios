import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/admin/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { InventarioModule } from './modules/admin/inventario/inventario.module';
import { PermissionsModule } from './modules/admin/permissions/permissions.module';
import { RolesModule } from './modules/admin/roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { NotaModule } from './modules/admin/nota/nota.module';
import { ClienteModule } from './modules/admin/cliente/cliente.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.production.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +`${process.env.DATABASE_PORT}` || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD ||'postgresql',
      database: process.env.DATABASE_NAME || 'backend_nest_inventarios',
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}'
      ],
      synchronize: false
    }),
    UsersModule,
    AuthModule,
    InventarioModule,
    PermissionsModule,
    RolesModule,
    NotaModule,
    ClienteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
