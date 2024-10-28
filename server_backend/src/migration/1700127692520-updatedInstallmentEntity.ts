import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedInstallmentEntity1700127692520
  implements MigrationInterface
{
  name = 'updatedInstallmentEntity1700127692520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installment" ADD "monthlyReportId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD CONSTRAINT "FK_f292ddffd9f517bcbcc86739ae6" FOREIGN KEY ("monthlyReportId") REFERENCES "monthly_reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installment" DROP CONSTRAINT "FK_f292ddffd9f517bcbcc86739ae6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" DROP COLUMN "monthlyReportId"`,
    );
  }
}
