import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedInvestmentRequestEntity1690894300476
  implements MigrationInterface
{
  name = 'UpdatedInvestmentRequestEntity1690894300476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ALTER COLUMN "dti" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ALTER COLUMN "status" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ALTER COLUMN "approved_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ALTER COLUMN "expires_at" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ALTER COLUMN "expires_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ALTER COLUMN "approved_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ALTER COLUMN "status" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ALTER COLUMN "dti" SET NOT NULL`,
    );
  }
}
