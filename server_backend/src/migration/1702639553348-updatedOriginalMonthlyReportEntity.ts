import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedOriginalMonthlyReportEntity1702639553348
  implements MigrationInterface
{
  name = 'updatedOriginalMonthlyReportEntity1702639553348';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ALTER COLUMN "inflow_description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ALTER COLUMN "outflow_description" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ALTER COLUMN "outflow_description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ALTER COLUMN "inflow_description" SET NOT NULL`,
    );
  }
}
