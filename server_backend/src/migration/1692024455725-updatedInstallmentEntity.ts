import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedInstallmentEntity1692024455725
  implements MigrationInterface
{
  name = 'UpdatedInstallmentEntity1692024455725';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installment" DROP COLUMN "event_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD "event_date" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installment" DROP COLUMN "event_date"`,
    );
    await queryRunner.query(`ALTER TABLE "installment" ADD "event_date" date`);
  }
}
