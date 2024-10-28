import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameBusinessSubsectorEntitiy1677195692164
  implements MigrationInterface
{
  name = 'renameBusinessSubsectorEntitiy1677195692164';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business-subsectors" RENAME TO business_subsectors`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE business_subsectors RENAME TO "business-subsectors"`,
    );
  }
}
