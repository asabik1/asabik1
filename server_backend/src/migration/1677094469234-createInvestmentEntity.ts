import { MigrationInterface, QueryRunner } from 'typeorm';

export class createInvestmentEntity1677094469234 implements MigrationInterface {
  name = 'createInvestmentEntity1677094469234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "investments" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "investor_id" integer, "investment_request_id" integer, CONSTRAINT "PK_a1263853f1a4fb8b849c1c9aff4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_02d307ca195a2c6e98012389076" FOREIGN KEY ("investor_id") REFERENCES "investors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_cfcce115c585270a0d2ee23d225" FOREIGN KEY ("investment_request_id") REFERENCES "investment_requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_cfcce115c585270a0d2ee23d225"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_02d307ca195a2c6e98012389076"`,
    );
    await queryRunner.query(`DROP TABLE "investments"`);
  }
}
