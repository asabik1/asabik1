import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedGlobalSettings1702034359004 implements MigrationInterface {
  name = 'updatedGlobalSettings1702034359004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "global_settings" ADD "invalid_transaction_penalty" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "global_settings" DROP COLUMN "invalid_transaction_penalty"`,
    );
  }
}
