import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedCreditRatingEntity1702306068075
  implements MigrationInterface
{
  name = 'updatedCreditRatingEntity1702306068075';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "credit_rating_data" ADD "low" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "credit_rating_data" ADD "high" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "credit_rating_data" DROP COLUMN "low"`,
    );
    await queryRunner.query(
      `ALTER TABLE "credit_rating_data" DROP COLUMN "high"`,
    );
  }
}
