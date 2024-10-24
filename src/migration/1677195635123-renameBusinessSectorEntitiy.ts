import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameBusinessSectorEntitiy1677195635123
  implements MigrationInterface
{
  name = 'renameBusinessSectorEntitiy1677195635123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business-sectors" RENAME TO business_sectors`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE business_sectors RENAME TO "business-sectors"`,
    );
  }
}
