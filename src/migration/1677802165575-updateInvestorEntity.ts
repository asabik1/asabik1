import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateInvestorEntity1677802165575 implements MigrationInterface {
  name = 'updateInvestorEntity1677802165575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "website" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "website" SET NOT NULL`,
    );
  }
}
