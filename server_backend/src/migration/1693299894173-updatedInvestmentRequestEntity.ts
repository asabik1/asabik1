import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedInvestmentRequestEntity1693299894173
  implements MigrationInterface
{
  name = 'UpdatedInvestmentRequestEntity1693299894173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" RENAME COLUMN "isExtended" TO "is_extended"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" RENAME COLUMN "is_extended" TO "isExtended"`,
    );
  }
}
