import { MigrationInterface, QueryRunner } from 'typeorm';

export class businessColumnChangeName1676647239577
  implements MigrationInterface
{
  name = 'businessColumnChangeName1676647239577';

  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sector" DROP CONSTRAINT "FK_269dee54138a583e08b31725021"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subsector" DROP CONSTRAINT "FK_5938a3230836df6605ed4aef1ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sector" RENAME COLUMN "business_id" TO "businessId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subsector" RENAME COLUMN "sector_id" TO "sectorId"`,
    );
  }
}
