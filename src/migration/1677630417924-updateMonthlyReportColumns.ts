import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateMonthlyReportColumns1677630417924
  implements MigrationInterface
{
  name = 'updateMonthlyReportColumns1677630417924';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ALTER COLUMN "v_inflow" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ALTER COLUMN "v_total" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ALTER COLUMN "v_total" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ALTER COLUMN "v_inflow" SET NOT NULL`,
    );
  }
}
