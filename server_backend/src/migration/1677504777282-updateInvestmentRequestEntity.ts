import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateInvestmentRequestEntity1677504777282
  implements MigrationInterface
{
  name = 'updateInvestmentRequestEntity1677504777282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "description" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "description" integer NOT NULL`,
    );
  }
}
