import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePaymentEntity1678920570917 implements MigrationInterface {
  name = 'updatePaymentEntity1678920570917';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "event_date"`);
    await queryRunner.query(`ALTER TABLE "payments" ADD "event_date" date`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "event_date"`);
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "event_date" TIMESTAMP`,
    );
  }
}
