import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedInvestmentRequestEntity1691156659424
  implements MigrationInterface
{
  name = 'UpdatedInvestmentRequestEntity1691156659424';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP CONSTRAINT "FK_301cc3e03adea6c0afdc51cb3b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ALTER COLUMN "business_owner_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD CONSTRAINT "FK_301cc3e03adea6c0afdc51cb3b0" FOREIGN KEY ("business_owner_id") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP CONSTRAINT "FK_301cc3e03adea6c0afdc51cb3b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ALTER COLUMN "business_owner_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD CONSTRAINT "FK_301cc3e03adea6c0afdc51cb3b0" FOREIGN KEY ("business_owner_id") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
