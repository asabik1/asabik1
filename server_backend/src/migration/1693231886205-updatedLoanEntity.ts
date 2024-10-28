import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedLoanEntity1693231886205 implements MigrationInterface {
  name = 'UpdatedLoanEntity1693231886205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" DROP COLUMN "next_payment_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "next_payment_date" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" DROP COLUMN "next_payment_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "next_payment_date" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
