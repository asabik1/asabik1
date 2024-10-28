import { MigrationInterface, QueryRunner } from 'typeorm';

export class plaidTokenToUserEntity1676044688653 implements MigrationInterface {
  name = 'plaidTokenToUserEntity1676044688653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "plaid_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "plaid_token"`);
  }
}
