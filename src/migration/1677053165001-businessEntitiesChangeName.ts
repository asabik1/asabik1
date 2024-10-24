import { MigrationInterface, QueryRunner } from 'typeorm';

export class businessEntitiesChangeName1677053165001
  implements MigrationInterface
{
  name = 'businessEntitiesChangeName1677053165001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "businesses" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "business-sectors" ("id" integer NOT NULL, "name" character varying NOT NULL, "business_id" integer, CONSTRAINT "PK_fda8171adf6dadd3b8d5c8bdd0b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "business-subsectors" ("id" integer NOT NULL, "name" character varying NOT NULL, "forbidden" boolean NOT NULL, "sector_id" integer, CONSTRAINT "PK_8d34f2eb2ab0039bf5c10dfc7d0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "business-sectors" ADD CONSTRAINT "FK_a3a5828ac3191b08373d938f0f9" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "business-subsectors" ADD CONSTRAINT "FK_956b650ab57afec652b0099e5d6" FOREIGN KEY ("sector_id") REFERENCES "business-sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business-subsectors" DROP CONSTRAINT "FK_956b650ab57afec652b0099e5d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business-sectors" DROP CONSTRAINT "FK_a3a5828ac3191b08373d938f0f9"`,
    );
    await queryRunner.query(`DROP TABLE "business-subsectors"`);
    await queryRunner.query(`DROP TABLE "business-sectors"`);
    await queryRunner.query(`DROP TABLE "businesses"`);
  }
}
