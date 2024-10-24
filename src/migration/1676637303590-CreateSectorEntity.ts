import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSectorEntity1676637303590 implements MigrationInterface {
  name = 'CreateSectorEntity1676637303590';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sector" ("id" integer NOT NULL, "name" character varying NOT NULL, "businessId" integer, CONSTRAINT "PK_668b2ea8a2f534425407732f3ab" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sector"`);
  }
}
