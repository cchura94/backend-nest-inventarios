import { DataSource } from "typeorm";

export default new DataSource({
    type: "postgres",
    host: "bd_postgres",
    port: 5432,
    username: 'postgres',
    password: 'postgresql',
    database: 'backend_nest_inventarios',
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
});