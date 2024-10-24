import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedOriginalMonthlyReportEntity1698674650290
  implements MigrationInterface
{
  name = 'addedOriginalMonthlyReportEntity1698674650290';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "FK_5ab6abe05e75b798ae936374a79"`,
    );
    await queryRunner.query(
      `CREATE TABLE "original_monthly_report" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "report_date" TIMESTAMP NOT NULL DEFAULT now(), "inflow" double precision NOT NULL, "outflow" double precision NOT NULL, "v_inflow" double precision, "v_total" double precision, "outflow_exceed" boolean NOT NULL, "is_negative_balance" boolean NOT NULL, "no_earning" boolean NOT NULL, "monthly_report" integer, CONSTRAINT "REL_cf8e6e8153a681565d8153650b" UNIQUE ("monthly_report"), CONSTRAINT "PK_47590d22e0e7b153d09e60ae2c5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD "original_monhly_report" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "UQ_08b1ee62514a2c5d2e2caac47a2" UNIQUE ("original_monhly_report")`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ADD CONSTRAINT "FK_cf8e6e8153a681565d8153650ba" FOREIGN KEY ("monthly_report") REFERENCES "monthly_reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_5ab6abe05e75b798ae936374a79" FOREIGN KEY ("credit_rating_data_id") REFERENCES "credit_rating_data"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_08b1ee62514a2c5d2e2caac47a2" FOREIGN KEY ("original_monhly_report") REFERENCES "original_monthly_report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "original_monthly_report" DROP CONSTRAINT "FK_cf8e6e8153a681565d8153650ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "UQ_08b1ee62514a2c5d2e2caac47a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP COLUMN "original_monhly_report"`,
    );
    await queryRunner.query(`DROP TABLE "original_monthly_report"`);
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_5ab6abe05e75b798ae936374a79" FOREIGN KEY ("credit_rating_data_id") REFERENCES "credit_rating_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
