import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateInvestment1689865622249 implements MigrationInterface {
  name = 'UpdateInvestment1689865622249';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investments" ADD "payment_from_investor_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "UQ_86c2bb2fbd5667eb509eca66e3b" UNIQUE ("payment_from_investor_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD "payment_to_business_owner_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "UQ_5e3e9d6febfe1f704f0bf7b2767" UNIQUE ("payment_to_business_owner_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_86c2bb2fbd5667eb509eca66e3b" FOREIGN KEY ("payment_from_investor_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_5e3e9d6febfe1f704f0bf7b2767" FOREIGN KEY ("payment_to_business_owner_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_5e3e9d6febfe1f704f0bf7b2767"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_86c2bb2fbd5667eb509eca66e3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "UQ_5e3e9d6febfe1f704f0bf7b2767"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP COLUMN "payment_to_business_owner_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "UQ_86c2bb2fbd5667eb509eca66e3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP COLUMN "payment_from_investor_id"`,
    );
  }
}
