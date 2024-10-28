import { MigrationInterface, QueryRunner } from 'typeorm';

export class createdRangesEntity1702051369121 implements MigrationInterface {
  name = 'createdRangesEntity1702051369121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rating_range" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "rating" character varying NOT NULL, "low" double precision NOT NULL, "high" double precision NOT NULL, CONSTRAINT "PK_db346ec191ff63aa0f209675d19" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rating_range"`);
  }
}
