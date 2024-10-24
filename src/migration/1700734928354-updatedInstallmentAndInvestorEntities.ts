import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedInstallmentAndInvestorEntities1700734928354
  implements MigrationInterface
{
  name = 'updatedInstallmentAndInvestorEntities1700734928354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installment" ADD "investor_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD CONSTRAINT "FK_fb43aa0336c382fca91fc6135e2" FOREIGN KEY ("investor_id") REFERENCES "investors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installment" DROP CONSTRAINT "FK_fb43aa0336c382fca91fc6135e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" DROP COLUMN "investor_id"`,
    );
  }
}
