import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateInstallment1689863671862 implements MigrationInterface {
  name = 'UpdateInstallment1689863671862';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "installment" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "installment" ADD "amount" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "installment" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "installment" ADD "amount" integer NOT NULL`,
    );
  }
}
