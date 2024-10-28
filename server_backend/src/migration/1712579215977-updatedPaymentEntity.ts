import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedPaymentEntity1712579215977 implements MigrationInterface {
  name = 'UpdatedPaymentEntity1712579215977';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "FK_c2865ee335cfe27fa6879b88efb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" RENAME COLUMN "application_fee" TO "payment_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "UQ_c2865ee335cfe27fa6879b88efb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP COLUMN "application_fee_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP COLUMN "payment_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "payment_type" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payments" DROP COLUMN "payment_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "payment_type" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "application_fee_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "UQ_c2865ee335cfe27fa6879b88efb" UNIQUE ("application_fee_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" RENAME COLUMN "payment_type" TO "application_fee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "FK_c2865ee335cfe27fa6879b88efb" FOREIGN KEY ("application_fee_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
