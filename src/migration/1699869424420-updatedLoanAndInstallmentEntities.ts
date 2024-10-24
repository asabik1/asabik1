import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedLoanAndInstallmentEntities1699869424420
  implements MigrationInterface
{
  name = 'updatedLoanAndInstallmentEntities1699869424420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "installment" DROP COLUMN "is_last"`);
    await queryRunner.query(
      `ALTER TABLE "installment" DROP COLUMN "date_scheduled"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD "is_skipped" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "final_payment_date" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ALTER COLUMN "transact_reference_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ALTER COLUMN "merchant_reference_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP COLUMN "next_payment_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "next_payment_date" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" DROP COLUMN "next_payment_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "next_payment_date" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ALTER COLUMN "merchant_reference_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ALTER COLUMN "transact_reference_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP COLUMN "final_payment_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" DROP COLUMN "is_skipped"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD "date_scheduled" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "installment" ADD "is_last" boolean`);
  }
}
