import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedMonthlyReport1690550628407 implements MigrationInterface {
  name = 'UpdatedMonthlyReport1690550628407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "global_settings" DROP COLUMN "application_fee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ALTER COLUMN "rating" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ALTER COLUMN "rating" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "global_settings" ADD "application_fee" integer NOT NULL`,
    );
  }
}
