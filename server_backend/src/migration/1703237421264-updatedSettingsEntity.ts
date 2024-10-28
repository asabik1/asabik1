import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedSettingsEntity1703237421264 implements MigrationInterface {
  name = 'updatedSettingsEntity1703237421264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "global_settings" ADD "application_fee" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ALTER COLUMN "inflow_description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ALTER COLUMN "outflow_description" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ALTER COLUMN "outflow_description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ALTER COLUMN "inflow_description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "global_settings" DROP COLUMN "application_fee"`,
    );
  }
}
