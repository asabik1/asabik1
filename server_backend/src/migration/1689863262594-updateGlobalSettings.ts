import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateGlobalSettings1689863262594 implements MigrationInterface {
  name = 'UpdateGlobalSettings1689863262594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "M"`);
    await queryRunner.query(
      `ALTER TABLE "global_settings" ADD "M" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "global_settings" DROP COLUMN "M"`);
    await queryRunner.query(
      `ALTER TABLE "global_settings" ADD "M" integer NOT NULL`,
    );
  }
}
