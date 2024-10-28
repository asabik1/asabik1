import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedPaymentsEntity1700040294711 implements MigrationInterface {
  name = 'updatedPaymentsEntity1700040294711';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "application_fee" integer`,
    );
    await queryRunner.query(`ALTER TABLE "installment" ADD "batch" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "installment" DROP COLUMN "batch"`);
    await queryRunner.query(
      `ALTER TABLE "payments" DROP COLUMN "application_fee"`,
    );
  }
}
