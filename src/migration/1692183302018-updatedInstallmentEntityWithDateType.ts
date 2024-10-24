import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedInstallmentEntityWithDateType1692183302018
  implements MigrationInterface
{
  name = 'UpdatedInstallmentEntityWithDateType1692183302018';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installment" DROP COLUMN "event_date"`,
    );
    await queryRunner.query(`ALTER TABLE "installment" ADD "event_date" date`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installment" DROP COLUMN "event_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD "event_date" TIMESTAMP`,
    );
  }
}
