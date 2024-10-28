import { MigrationInterface, QueryRunner } from 'typeorm';

export class businessOwnerSurvey1677542672793 implements MigrationInterface {
  name = 'businessOwnerSurvey1677542672793';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "structure"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "businessStructure" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "monthly_sales" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "is_profile_complete" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "is_profile_complete"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "monthly_sales"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "businessStructure"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "structure" character varying`,
    );
  }
}
