import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateFileID1677508398452 implements MigrationInterface {
  name = 'updateFileID1677508398452';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP CONSTRAINT "FK_bfe0082df20e8f2ab81908e0c82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
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
      `ALTER TABLE "files" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD CONSTRAINT "FK_bfe0082df20e8f2ab81908e0c82" FOREIGN KEY ("image") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
