import { MigrationInterface, QueryRunner } from 'typeorm';

export class createInvestmentRequestEntity1677090531696
  implements MigrationInterface
{
  name = 'createInvestmentRequestEntity1677090531696';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "investment_requests" ("id" SERIAL NOT NULL, "proposeOfTheLoan" character varying NOT NULL, "returnTerm" integer NOT NULL, "description" integer NOT NULL, "requiredCapital" integer NOT NULL, "business_owner_id" integer, CONSTRAINT "PK_4076d188494b9f8abd29a44c498" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD CONSTRAINT "FK_301cc3e03adea6c0afdc51cb3b0" FOREIGN KEY ("business_owner_id") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP CONSTRAINT "FK_301cc3e03adea6c0afdc51cb3b0"`,
    );
    await queryRunner.query(`DROP TABLE "investment_requests"`);
  }
}
