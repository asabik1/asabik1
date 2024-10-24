import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedMonthlyReportEntity1698745552205
  implements MigrationInterface
{
  name = 'updatedMonthlyReportEntity1698745552205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD "is_confirmed" boolean NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP COLUMN "is_confirmed"`,
    );
  }
}
