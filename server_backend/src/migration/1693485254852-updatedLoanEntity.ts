import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedLoanEntity1693485254852 implements MigrationInterface {
  name = 'UpdatedLoanEntity1693485254852';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "investment_request_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "UQ_cac6322f9371f48fe37b7ecdb15" UNIQUE ("investment_request_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "FK_cac6322f9371f48fe37b7ecdb15" FOREIGN KEY ("investment_request_id") REFERENCES "investment_requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "FK_cac6322f9371f48fe37b7ecdb15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "UQ_cac6322f9371f48fe37b7ecdb15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP COLUMN "investment_request_id"`,
    );
  }
}
