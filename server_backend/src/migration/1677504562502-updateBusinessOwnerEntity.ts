import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBusinessOwnerEntity1677504562502
  implements MigrationInterface
{
  name = 'updateBusinessOwnerEntity1677504562502';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_sectors" DROP CONSTRAINT "FK_a3a5828ac3191b08373d938f0f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_subsectors" DROP CONSTRAINT "FK_956b650ab57afec652b0099e5d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "structure" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "img_url" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "company_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "owner_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "street" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "city" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "zip_code" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "phone" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "website" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "business" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "industry" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "subindustry" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "rating" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_sectors" ADD CONSTRAINT "FK_83e5ac99a12514b7d9d7cdd3116" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_subsectors" ADD CONSTRAINT "FK_f3f4f83ba9b6441a6033725a9b3" FOREIGN KEY ("sector_id") REFERENCES "business_sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_subsectors" DROP CONSTRAINT "FK_f3f4f83ba9b6441a6033725a9b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_sectors" DROP CONSTRAINT "FK_83e5ac99a12514b7d9d7cdd3116"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "rating" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "subindustry" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "industry" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "business" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "website" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "phone" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "zip_code" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "city" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "street" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "owner_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "company_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "img_url" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ALTER COLUMN "structure" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_subsectors" ADD CONSTRAINT "FK_956b650ab57afec652b0099e5d6" FOREIGN KEY ("sector_id") REFERENCES "business_sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_sectors" ADD CONSTRAINT "FK_a3a5828ac3191b08373d938f0f9" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
