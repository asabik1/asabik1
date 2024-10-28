import { MigrationInterface, QueryRunner } from 'typeorm';

export class createMonthlyReportEntity1677601392478
  implements MigrationInterface
{
  name = 'createMonthlyReportEntity1677601392478';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "monthly_reports" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "report_date" TIMESTAMP NOT NULL DEFAULT now(), "inflow" double precision NOT NULL, "outflow" double precision NOT NULL, "v_inflow" double precision NOT NULL, "v_total" double precision NOT NULL, "outflow_exceed" boolean NOT NULL, "is_negative_balance" boolean NOT NULL, "no_earning" boolean NOT NULL, "business_owner_id" integer, CONSTRAINT "PK_6d42f2bb59ee092e3349e2b8992" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_2365fdc34c00f7806be46ee61a6" FOREIGN KEY ("business_owner_id") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "FK_2365fdc34c00f7806be46ee61a6"`,
    );
    await queryRunner.query(`DROP TABLE "monthly_reports"`);
  }
}
