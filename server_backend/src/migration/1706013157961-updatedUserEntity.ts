import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedUserEntity1706013157961 implements MigrationInterface {
  name = 'UpdatedUserEntity1706013157961';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "is_verified" boolean`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_verified"`);
  }
}
