import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedInvestmentRequest1692957615660
  implements MigrationInterface
{
  name = 'UpdatedInvestmentRequest1692957615660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "isExtended" boolean`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "isExtended"`,
    );
  }
}
