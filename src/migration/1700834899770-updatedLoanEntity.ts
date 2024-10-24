import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedLoanEntity1700834899770 implements MigrationInterface {
  name = 'updatedLoanEntity1700834899770';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "application_fee_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "UQ_c2865ee335cfe27fa6879b88efb" UNIQUE ("application_fee_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "FK_c2865ee335cfe27fa6879b88efb" FOREIGN KEY ("application_fee_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "FK_c2865ee335cfe27fa6879b88efb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "UQ_c2865ee335cfe27fa6879b88efb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP COLUMN "application_fee_id"`,
    );
  }
}
