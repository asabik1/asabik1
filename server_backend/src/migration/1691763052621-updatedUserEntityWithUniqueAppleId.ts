import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedUserEntityWithUniqueAppleId1691763052621
  implements MigrationInterface
{
  name = 'UpdatedUserEntityWithUniqueAppleId1691763052621';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "appleId" TO "apple_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_222297ce9ce93ae516d1e82b07c" UNIQUE ("apple_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_222297ce9ce93ae516d1e82b07c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "apple_id" TO "appleId"`,
    );
  }
}
