import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeEmailColumnFromBO1677504652360
  implements MigrationInterface
{
  name = 'removeEmailColumnFromBO1677504652360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "email"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "email" character varying NOT NULL`,
    );
  }
}
