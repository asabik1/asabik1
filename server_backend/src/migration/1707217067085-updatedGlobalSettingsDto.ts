import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedGlobalSettingsDto1707217067085
  implements MigrationInterface
{
  name = 'UpdatedGlobalSettingsDto1707217067085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "R"`);
    await queryRunner.query(
      `ALTER TABLE "global_settings" ADD "R" double precision NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "A"`);
    await queryRunner.query(
      `ALTER TABLE "global_settings" ADD "A" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "A"`);
    await queryRunner.query(
      `ALTER TABLE "global_settings" ADD "A" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "R"`);
    await queryRunner.query(
      `ALTER TABLE "global_settings" ADD "R" integer NOT NULL`,
    );
  }
}
