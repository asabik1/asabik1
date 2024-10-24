import { MigrationInterface, QueryRunner } from 'typeorm';

export class businessownerSubsector1677537509285 implements MigrationInterface {
  name = 'businessownerSubsector1677537509285';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "business"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "industry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "subindustry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "business_subsector_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD CONSTRAINT "FK_a8720ef70669c8e95a877271010" FOREIGN KEY ("business_subsector_id") REFERENCES "business_subsectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP CONSTRAINT "FK_a8720ef70669c8e95a877271010"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "business_subsector_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "subindustry" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "industry" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "business" character varying`,
    );
  }
}
