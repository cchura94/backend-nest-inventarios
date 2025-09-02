### Ejecutar archivos migrations (crear tablas faltantes)
```
npm run migration:run
```
### Generar migraciones a partir de entidades
```
npm run migration:generate --name=create_user_table
```
### Para crear nuevos archivos migrations
```
npm run migration:create --name=create_prueba_table
```
### Para revertir migraciones
```
npm run migration:revert
```
