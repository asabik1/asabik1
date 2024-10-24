import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedMonthlyReport1701874815993 implements MigrationInterface {
  name = 'updatedMonthlyReport1701874815993';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "FK_5ab6abe05e75b798ae936374a79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_5ab6abe05e75b798ae936374a79" FOREIGN KEY ("credit_rating_data_id") REFERENCES "credit_rating_data"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "FK_5ab6abe05e75b798ae936374a79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_5ab6abe05e75b798ae936374a79" FOREIGN KEY ("credit_rating_data_id") REFERENCES "credit_rating_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
