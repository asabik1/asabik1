import { MigrationInterface, QueryRunner } from 'typeorm';

export class createdIdentityScoreEntity1703678354289
  implements MigrationInterface
{
  name = 'createdIdentityScoreEntity1703678354289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "identity_scores" ("id" SERIAL NOT NULL, "owner_name_score" integer, "phone_score" integer, "email_score" integer, "address_score" integer, CONSTRAINT "PK_1f11c8b05f4c92c8235666af953" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "identity_score" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD CONSTRAINT "UQ_41a9c56bf8d5974bc33ee0834d0" UNIQUE ("identity_score")`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ALTER COLUMN "inflow_description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ALTER COLUMN "outflow_description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD CONSTRAINT "FK_41a9c56bf8d5974bc33ee0834d0" FOREIGN KEY ("identity_score") REFERENCES "identity_scores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP CONSTRAINT "FK_41a9c56bf8d5974bc33ee0834d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ALTER COLUMN "outflow_description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ALTER COLUMN "inflow_description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP CONSTRAINT "UQ_41a9c56bf8d5974bc33ee0834d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "identity_score"`,
    );
    await queryRunner.query(`DROP TABLE "identity_scores"`);
  }
}
