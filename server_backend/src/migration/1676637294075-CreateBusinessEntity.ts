import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBusinessEntity1676637294075 implements MigrationInterface {
  name = 'CreateBusinessEntity1676637294075';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "business" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "business"`);
  }
}
