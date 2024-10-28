import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedInstallmentEntity1692004621372
  implements MigrationInterface
{
  name = 'UpdatedInstallmentEntity1692004621372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installment" ALTER COLUMN "is_last" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ALTER COLUMN "date_scheduled" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ALTER COLUMN "amount" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installment" ALTER COLUMN "amount" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ALTER COLUMN "date_scheduled" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ALTER COLUMN "is_last" SET NOT NULL`,
    );
  }
}
