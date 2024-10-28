import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeColumnsNames1677105511436 implements MigrationInterface {
  name = 'changeColumnsNames1677105511436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_5e5043caf7062e221ca797e58bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_d6266e4eb3f6dc78825d5c2951b"`,
    );
    await queryRunner.query(`ALTER TABLE "investors" DROP COLUMN "fullName"`);
    await queryRunner.query(
      `ALTER TABLE "investors" DROP COLUMN "companyName"`,
    );
    await queryRunner.query(`ALTER TABLE "investors" DROP COLUMN "webSite"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_5e5043caf7062e221ca797e58bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "business_owner_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_d6266e4eb3f6dc78825d5c2951b"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "investor_id"`);
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "imgUrl"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "owenr_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "zipCode"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "proposeOfTheLoan"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "returnTerm"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "requiredCapital"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD "full_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD "company_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD "website" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "img_url" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "owner_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "zip_code" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "purpose_of_the_loan" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "return_term" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "required_capital" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "required_capital"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "return_term"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "purpose_of_the_loan"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "zip_code"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "owner_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "img_url"`,
    );
    await queryRunner.query(`ALTER TABLE "investors" DROP COLUMN "website"`);
    await queryRunner.query(
      `ALTER TABLE "investors" DROP COLUMN "company_name"`,
    );
    await queryRunner.query(`ALTER TABLE "investors" DROP COLUMN "full_name"`);
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "requiredCapital" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "returnTerm" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "proposeOfTheLoan" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "zipCode" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "owenr_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "imgUrl" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "investor_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_d6266e4eb3f6dc78825d5c2951b" UNIQUE ("investor_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "business_owner_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_5e5043caf7062e221ca797e58bb" UNIQUE ("business_owner_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD "webSite" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD "companyName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD "fullName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d6266e4eb3f6dc78825d5c2951b" FOREIGN KEY ("investor_id") REFERENCES "investors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_5e5043caf7062e221ca797e58bb" FOREIGN KEY ("business_owner_id") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
