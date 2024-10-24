import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateProfileEntities1677870415693 implements MigrationInterface {
  name = 'updateProfileEntities1677870415693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP CONSTRAINT "FK_bfe0082df20e8f2ab81908e0c82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "full_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "company_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD CONSTRAINT "FK_bfe0082df20e8f2ab81908e0c82" FOREIGN KEY ("image") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP CONSTRAINT "FK_bfe0082df20e8f2ab81908e0c82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "company_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "full_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD CONSTRAINT "FK_bfe0082df20e8f2ab81908e0c82" FOREIGN KEY ("image") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
