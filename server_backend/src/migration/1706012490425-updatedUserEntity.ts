import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedUserEntity1706012490425 implements MigrationInterface {
  name = 'UpdatedUserEntity1706012490425';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "identity_verif_id" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "identity_verif_id"`,
    );
  }
}
