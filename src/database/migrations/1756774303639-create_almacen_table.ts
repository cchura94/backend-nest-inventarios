import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAlmacenTable1756774303639 implements MigrationInterface {
    name = 'CreateAlmacenTable1756774303639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "almacenes" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "codigo" character varying(100), "descripcion" text, "sucursalId" integer, CONSTRAINT "PK_2af9818dc2019bc97c7d26217e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "almacenes" ADD CONSTRAINT "FK_f925acc11f5654a6be6ba3855fa" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "almacenes" DROP CONSTRAINT "FK_f925acc11f5654a6be6ba3855fa"`);
        await queryRunner.query(`DROP TABLE "almacenes"`);
    }

}
