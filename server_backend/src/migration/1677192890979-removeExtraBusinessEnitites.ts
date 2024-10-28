import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeExtraBusinessEnitites1677192890979
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sector" DROP CONSTRAINT "FK_269dee54138a583e08b31725021"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subsector" DROP CONSTRAINT "FK_5938a3230836df6605ed4aef1ed"`,
    );

    await queryRunner.query(`DROP TABLE "business"`);
    await queryRunner.query(`DROP TABLE "sector"`);
    await queryRunner.query(`DROP TABLE "subsector"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "business" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sector" ("id" integer NOT NULL, "name" character varying NOT NULL, "businessId" integer, CONSTRAINT "PK_668b2ea8a2f534425407732f3ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subsector" ("id" integer NOT NULL, "name" character varying NOT NULL, "forbidden" boolean NOT NULL, "sectorId" integer, CONSTRAINT "PK_4794e38ae081bb0fad21493b4ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "subsector" RENAME COLUMN "sectorId" TO "sector_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sector" RENAME COLUMN "businessId" TO "business_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subsector" ADD CONSTRAINT "FK_5938a3230836df6605ed4aef1ed" FOREIGN KEY ("sector_id") REFERENCES "sector"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sector" ADD CONSTRAINT "FK_269dee54138a583e08b31725021" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
