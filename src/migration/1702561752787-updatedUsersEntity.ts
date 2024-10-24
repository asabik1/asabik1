import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedUsersEntity1702561752787 implements MigrationInterface {
  name = 'updatedUsersEntity1702561752787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "is_frozen_by_user" boolean`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "is_frozen_by_user"`,
    );
  }
}
