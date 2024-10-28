import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePaymentEntity1690285832402 implements MigrationInterface {
  name = 'UpdatePaymentEntity1690285832402';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payments" RENAME COLUMN "verification_code " TO "verification_code"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payments" RENAME COLUMN "verification_code" TO "verification_code "`,
    );
  }
}
