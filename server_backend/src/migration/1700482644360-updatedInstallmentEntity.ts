import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedInstallmentEntity1700482644360
  implements MigrationInterface
{
  name = 'updatedInstallmentEntity1700482644360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installment" DROP CONSTRAINT "FK_f292ddffd9f517bcbcc86739ae6"`,
    );
    await queryRunner.query(`ALTER TABLE "installment" DROP COLUMN "batch"`);
    await queryRunner.query(
      `ALTER TABLE "installment" DROP COLUMN "monthlyReportId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD "monthly_report_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD CONSTRAINT "FK_7b3fea4be9252a9ff162521da77" FOREIGN KEY ("monthly_report_id") REFERENCES "monthly_reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installment" DROP CONSTRAINT "FK_7b3fea4be9252a9ff162521da77"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" DROP COLUMN "monthly_report_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD "monthlyReportId" integer`,
    );
    await queryRunner.query(`ALTER TABLE "installment" ADD "batch" integer`);
    await queryRunner.query(
      `ALTER TABLE "installment" ADD CONSTRAINT "FK_f292ddffd9f517bcbcc86739ae6" FOREIGN KEY ("monthlyReportId") REFERENCES "monthly_reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
