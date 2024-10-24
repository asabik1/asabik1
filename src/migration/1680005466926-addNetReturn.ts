import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNetReturn1680005466926 implements MigrationInterface {
  name = 'addNetReturn1680005466926';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "net_return" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "net_return"`,
    );
  }
}
