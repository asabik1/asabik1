import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedInvestmentEntity1693565450897
  implements MigrationInterface
{
  name = 'UpdatedInvestmentEntity1693565450897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_33ff17b63b1c553f69464a030d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" RENAME COLUMN "installment_id" TO "installmentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_34a326a402b702221f95301df08" FOREIGN KEY ("installmentId") REFERENCES "installment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_34a326a402b702221f95301df08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" RENAME COLUMN "installmentId" TO "installment_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_33ff17b63b1c553f69464a030d6" FOREIGN KEY ("installment_id") REFERENCES "installment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
