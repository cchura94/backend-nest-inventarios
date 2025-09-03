import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/admin/users/users.module';
import { User } from './modules/admin/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { InventarioModule } from './modules/admin/inventario/inventario.module';
import { PermissionsModule } from './modules/admin/permissions/permissions.module';
import { RolesModule } from './modules/admin/roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgresql',
      database: 'backend_nest_inventarios',
      entities: [
        User
        // __dirname + '/../**/*.entity{.ts,.js}'
      ],
      synchronize: false
    }),
    UsersModule,
    AuthModule,
    InventarioModule,
    PermissionsModule,
    RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
