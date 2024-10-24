import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedFinancialReportEntity1701953959202
  implements MigrationInterface
{
  name = 'updatedFinancialReportEntity1701953959202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'financial_report', 'public'],
    );
    await queryRunner.query(`DROP VIEW "financial_report"`);
    await queryRunner.query(
      `CREATE VIEW "financial_report" AS SELECT SQRT(AVG("monthly_reports"."v_inflow")) AS "v_inflow", SQRT(AVG("monthly_reports"."v_total")) AS "v_total", AVG("monthly_reports"."inflow") AS "average_e", AVG("monthly_reports"."outflow") AS "average_l", COUNT("monthly_reports"."id") AS "total_no_month", COUNT(CASE WHEN "monthly_reports"."outflow_exceed" THEN 1 END) AS "outflow_exceed", COUNT(CASE WHEN "monthly_reports"."is_negative_balance" THEN 1 END) AS "negative_balance", COUNT(CASE WHEN "monthly_reports"."no_earning" THEN 1 END) AS "no_earning", "monthly_reports"."business_owner_id" AS "business_owner_id" FROM "monthly_reports" "monthly_reports" GROUP BY "monthly_reports"."business_owner_id"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'financial_report',
        'SELECT SQRT(AVG("monthly_reports"."v_inflow")) AS "v_inflow", SQRT(AVG("monthly_reports"."v_total")) AS "v_total", AVG("monthly_reports"."inflow") AS "average_e", AVG("monthly_reports"."outflow") AS "average_l", COUNT("monthly_reports"."id") AS "total_no_month", COUNT(CASE WHEN "monthly_reports"."outflow_exceed" THEN 1 END) AS "outflow_exceed", COUNT(CASE WHEN "monthly_reports"."is_negative_balance" THEN 1 END) AS "negative_balance", COUNT(CASE WHEN "monthly_reports"."no_earning" THEN 1 END) AS "no_earning", "monthly_reports"."business_owner_id" AS "business_owner_id" FROM "monthly_reports" "monthly_reports" GROUP BY "monthly_reports"."business_owner_id"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'financial_report', 'public'],
    );
    await queryRunner.query(`DROP VIEW "financial_report"`);
    await queryRunner.query(
      `CREATE VIEW "financial_report" AS SELECT SQRT(AVG("monthly_reports"."v_inflow")) AS "v_inflow", SQRT(AVG("monthly_reports"."v_total")) AS "v_total", AVG("monthly_reports"."inflow") AS "average_e", AVG("monthly_reports"."outflow") AS "average_l", COUNT("monthly_reports"."id") AS "total_no_month", COUNT(CASE WHEN "monthly_reports"."outflow_exceed" THEN 1 END) AS "outflow_exceed", COUNT(CASE WHEN "monthly_reports"."is_negative_balance" THEN 1 END) AS "negative_balance", COUNT(CASE WHEN "monthly_reports"."no_earning" THEN 1 END) AS "no_earning", "monthly_reports"."business_owner_id" AS "business_owner_id" FROM "monthly_reports" "monthly_reports" GROUP BY "monthly_reports"."business_owner_id" LIMIT 24`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'financial_report',
        'SELECT SQRT(AVG("monthly_reports"."v_inflow")) AS "v_inflow", SQRT(AVG("monthly_reports"."v_total")) AS "v_total", AVG("monthly_reports"."inflow") AS "average_e", AVG("monthly_reports"."outflow") AS "average_l", COUNT("monthly_reports"."id") AS "total_no_month", COUNT(CASE WHEN "monthly_reports"."outflow_exceed" THEN 1 END) AS "outflow_exceed", COUNT(CASE WHEN "monthly_reports"."is_negative_balance" THEN 1 END) AS "negative_balance", COUNT(CASE WHEN "monthly_reports"."no_earning" THEN 1 END) AS "no_earning", "monthly_reports"."business_owner_id" AS "business_owner_id" FROM "monthly_reports" "monthly_reports" GROUP BY "monthly_reports"."business_owner_id" LIMIT 24',
      ],
    );
  }
}
