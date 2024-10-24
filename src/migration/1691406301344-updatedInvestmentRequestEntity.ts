import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedInvestmentRequestEntity1691406301344
  implements MigrationInterface
{
  name = 'UpdatedInvestmentRequestEntity1691406301344';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "rating_update" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "rating_update"`,
    );
  }
}
