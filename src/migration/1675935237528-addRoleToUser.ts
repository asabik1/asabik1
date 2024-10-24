import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRoleToUser1675935237528 implements MigrationInterface {
  name = 'addRoleToUser1675935237528';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'business-owner'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
  }
}
