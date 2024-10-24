import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateLoanEntity1690183317859 implements MigrationInterface {
  name = 'UpdateLoanEntity1690183317859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" RENAME COLUMN "raised" TO "amount_to_be_deposited"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" RENAME COLUMN "amount_to_be_deposited" TO "raised"`,
    );
  }
}
