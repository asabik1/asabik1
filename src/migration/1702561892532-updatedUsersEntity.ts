import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedUsersEntity1702561892532 implements MigrationInterface {
  name = 'updatedUsersEntity1702561892532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "is_frozen_by_user" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "is_frozen_by_user" DROP DEFAULT`,
    );
  }
}
