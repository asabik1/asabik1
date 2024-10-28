import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedGlobalSettingsEntity1701162927322
  implements MigrationInterface
{
  name = 'updatedGlobalSettingsEntity1701162927322';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "global_settings" ADD "plaid_token_penalty" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "global_settings" DROP COLUMN "plaid_token_penalty"`,
    );
  }
}
