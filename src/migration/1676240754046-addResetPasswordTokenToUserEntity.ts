import { MigrationInterface, QueryRunner } from 'typeorm';

export class addResetPasswordTokenToUserEntity1676240754046
  implements MigrationInterface
{
  name = 'addResetPasswordTokenToUserEntity1676240754046';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "reset_password_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "reset_password_token"`,
    );
  }
}
