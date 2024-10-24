import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedOriginalMonthlyReportEntity1698743656042
  implements MigrationInterface
{
  name = 'updatedOriginalMonthlyReportEntity1698743656042';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "FK_08b1ee62514a2c5d2e2caac47a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "FK_5ab6abe05e75b798ae936374a79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ADD "inflow_description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ADD "outflow_description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_5ab6abe05e75b798ae936374a79" FOREIGN KEY ("credit_rating_data_id") REFERENCES "credit_rating_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_08b1ee62514a2c5d2e2caac47a2" FOREIGN KEY ("original_monhly_report") REFERENCES "original_monthly_report"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "FK_08b1ee62514a2c5d2e2caac47a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "FK_5ab6abe05e75b798ae936374a79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" DROP COLUMN "outflow_description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" DROP COLUMN "inflow_description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_5ab6abe05e75b798ae936374a79" FOREIGN KEY ("credit_rating_data_id") REFERENCES "credit_rating_data"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_08b1ee62514a2c5d2e2caac47a2" FOREIGN KEY ("original_monhly_report") REFERENCES "original_monthly_report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
