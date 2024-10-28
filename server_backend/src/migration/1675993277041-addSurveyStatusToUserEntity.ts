import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSurveyStatusToUserEntity1675993277041
  implements MigrationInterface
{
  name = 'addSurveyStatusToUserEntity1675993277041';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "survey_status" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "survey_status"`);
  }
}
