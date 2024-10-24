import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBusinessOwners1677090152730 implements MigrationInterface {
  name = 'createBusinessOwners1677090152730';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "business_owners" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP NOT NULL DEFAULT now(), "structure" character varying NOT NULL, "imgUrl" character varying NOT NULL, "email" character varying NOT NULL, "company_name" character varying NOT NULL, "owenr_name" character varying NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" character varying NOT NULL, "phone" character varying NOT NULL, "website" character varying NOT NULL, "business" character varying NOT NULL, "industry" character varying NOT NULL, "subindustry" character varying NOT NULL, "description" character varying NOT NULL, "rating" character varying NOT NULL, "user_id" integer, CONSTRAINT "REL_2a92beb4988e9278b044ededed" UNIQUE ("user_id"), CONSTRAINT "PK_177492f4438d9e389e4c63d1064" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "business_owner_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_5e5043caf7062e221ca797e58bb" UNIQUE ("business_owner_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_5e5043caf7062e221ca797e58bb" FOREIGN KEY ("business_owner_id") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD CONSTRAINT "FK_2a92beb4988e9278b044ededed6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP CONSTRAINT "FK_2a92beb4988e9278b044ededed6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_5e5043caf7062e221ca797e58bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_5e5043caf7062e221ca797e58bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "business_owner_id"`,
    );
    await queryRunner.query(`DROP TABLE "business_owners"`);
  }
}
