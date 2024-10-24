import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedMonthlyReports1698240015970 implements MigrationInterface {
  name = 'updatedMonthlyReports1698240015970';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "FK_8d1008f9d1c8152805c3c778b4a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" RENAME COLUMN "business_subsector_id" TO "credit_rating_data_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_5ab6abe05e75b798ae936374a79" FOREIGN KEY ("credit_rating_data_id") REFERENCES "credit_rating_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "FK_5ab6abe05e75b798ae936374a79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" RENAME COLUMN "credit_rating_data_id" TO "business_subsector_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_8d1008f9d1c8152805c3c778b4a" FOREIGN KEY ("business_subsector_id") REFERENCES "credit_rating_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
