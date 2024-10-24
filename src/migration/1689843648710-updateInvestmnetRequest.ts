import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateInvestmnetRequest1689843648710
  implements MigrationInterface
{
  name = 'UpdateInvestmnetRequest1689843648710';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP CONSTRAINT "FK_3662ddeed887187934694011809"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" RENAME COLUMN "loan" TO "loan_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" RENAME CONSTRAINT "UQ_3662ddeed887187934694011809" TO "UQ_2b800fd137ebe40cb9e038ef3eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD CONSTRAINT "FK_2b800fd137ebe40cb9e038ef3eb" FOREIGN KEY ("loan_id") REFERENCES "loan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP CONSTRAINT "FK_2b800fd137ebe40cb9e038ef3eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" RENAME CONSTRAINT "UQ_2b800fd137ebe40cb9e038ef3eb" TO "UQ_3662ddeed887187934694011809"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" RENAME COLUMN "loan_id" TO "loan"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD CONSTRAINT "FK_3662ddeed887187934694011809" FOREIGN KEY ("loan") REFERENCES "loan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
