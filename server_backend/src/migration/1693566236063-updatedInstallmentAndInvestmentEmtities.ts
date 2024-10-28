import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedInstallmentAndInvestmentEmtities1693566236063
  implements MigrationInterface
{
  name = 'UpdatedInstallmentAndInvestmentEmtities1693566236063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_33ff17b63b1c553f69464a030d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP COLUMN "installment_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investments" ADD "installment_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_33ff17b63b1c553f69464a030d6" FOREIGN KEY ("installment_id") REFERENCES "installment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
