import { MigrationInterface, QueryRunner } from 'typeorm';

export class joinImagesColumn1677249615575 implements MigrationInterface {
  name = 'joinImagesColumn1677249615575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "business_owners" ADD "image" uuid`);
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD CONSTRAINT "UQ_bfe0082df20e8f2ab81908e0c82" UNIQUE ("image")`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ALTER COLUMN "id" DROP DEFAULT`,
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
      `ALTER TABLE "files" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP CONSTRAINT "UQ_bfe0082df20e8f2ab81908e0c82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "image"`,
    );
  }
}
