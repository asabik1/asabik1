import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubsectorEntity1676637311944 implements MigrationInterface {
  name = 'CreateSubsectorEntity1676637311944';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subsector" ("id" integer NOT NULL, "name" character varying NOT NULL, "forbidden" boolean NOT NULL, "sectorId" integer, CONSTRAINT "PK_4794e38ae081bb0fad21493b4ca" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "subsector"`);
  }
}
