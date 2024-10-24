import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedLoanEntity1693387743561 implements MigrationInterface {
  name = 'UpdatedLoanEntity1693387743561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" ALTER COLUMN "next_payment_date" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" ALTER COLUMN "next_payment_date" SET NOT NULL`,
    );
  }
}
