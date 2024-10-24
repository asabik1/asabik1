import { MigrationInterface, QueryRunner } from 'typeorm';

export class investmentColumnChangeName1677687205555
  implements MigrationInterface
{
  name = 'investmentColumnChangeName1677687205555';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investments" RENAME COLUMN "value" TO "amount"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investments" RENAME COLUMN "amount" TO "value"`,
    );
  }
}
