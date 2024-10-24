import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateEmailConfirmedColumn1677869776505
  implements MigrationInterface
{
  name = 'updateEmailConfirmedColumn1677869776505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "activated" TO "email_confirmed"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "email_confirmed" TO "activated"`,
    );
  }
}
