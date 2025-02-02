import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1730194973500 implements MigrationInterface {
  name = ' $npmConfigName1730194973500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "penalties" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "penalty_type" character varying NOT NULL, "amount" integer NOT NULL, "is_resolved" boolean NOT NULL DEFAULT false, "business_owner_id" integer, "payment_from_business_owner_id" integer, "payment_to_admin_id" integer, CONSTRAINT "REL_11b7570404e978fc06cf1de9c4" UNIQUE ("payment_from_business_owner_id"), CONSTRAINT "REL_30d52df3a05914e81dc2cd29eb" UNIQUE ("payment_to_admin_id"), CONSTRAINT "PK_c917b09222ad10103d984fc4e7e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "credit_rating_data" ("id" SERIAL NOT NULL, "rating" character varying NOT NULL, "low" double precision NOT NULL, "high" double precision NOT NULL, "requested_amount" integer NOT NULL, "R" integer NOT NULL, "M" double precision NOT NULL, "A" integer NOT NULL, "v_inflow" double precision NOT NULL, "v_total" double precision NOT NULL, "average_e" double precision NOT NULL, "average_l" double precision NOT NULL, "total_no_month" integer NOT NULL, "outflow_exceed" integer NOT NULL, "negative_balance" integer NOT NULL, "no_earning" integer NOT NULL, "O" double precision NOT NULL, "I" double precision NOT NULL, "d1" double precision NOT NULL, "d2" double precision NOT NULL, "d0" double precision NOT NULL, "PoD" double precision NOT NULL, "max_loan_calc" double precision NOT NULL, "investment_request_id" integer, CONSTRAINT "REL_8900af06bc289aa1f6fd9d030f" UNIQUE ("investment_request_id"), CONSTRAINT "PK_c4a62f36b2f51c3d0ccec8ad4de" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "original_monthly_report" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "report_date" TIMESTAMP NOT NULL DEFAULT now(), "inflow" double precision NOT NULL, "outflow" double precision NOT NULL, "v_inflow" double precision, "v_total" double precision, "outflow_exceed" boolean NOT NULL, "is_negative_balance" boolean NOT NULL, "no_earning" boolean NOT NULL, "inflow_description" character varying, "outflow_description" character varying, "monthly_report" integer, CONSTRAINT "REL_cf8e6e8153a681565d8153650b" UNIQUE ("monthly_report"), CONSTRAINT "PK_47590d22e0e7b153d09e60ae2c5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "monthly_reports" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "report_date" TIMESTAMP NOT NULL DEFAULT now(), "inflow" double precision NOT NULL, "outflow" double precision NOT NULL, "v_inflow" double precision, "v_total" double precision, "outflow_exceed" boolean NOT NULL, "is_negative_balance" boolean NOT NULL, "no_earning" boolean NOT NULL, "is_confirmed" boolean NOT NULL, "business_owner_id" integer, "credit_rating_data_id" integer, "original_monhly_report" integer, CONSTRAINT "REL_08b1ee62514a2c5d2e2caac47a" UNIQUE ("original_monhly_report"), CONSTRAINT "PK_6d42f2bb59ee092e3349e2b8992" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "apple_id" character varying, "email" character varying NOT NULL, "password" character varying, "email_confirmed" boolean NOT NULL, "account_activatation_token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "role" character varying NOT NULL DEFAULT 'business-owner', "survey_status" character varying, "plaid_token" character varying, "invalid_plaid_token_detection" TIMESTAMP, "reset_password_token" character varying, "is_frozen_by_user" boolean DEFAULT false, "identity_verif_id" character varying, "is_verified" boolean, "investor_id" integer, "business_owner_id" integer, CONSTRAINT "UQ_222297ce9ce93ae516d1e82b07c" UNIQUE ("apple_id"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_d6266e4eb3f6dc78825d5c2951" UNIQUE ("investor_id"), CONSTRAINT "REL_5e5043caf7062e221ca797e58b" UNIQUE ("business_owner_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "investors" ("id" SERIAL NOT NULL, "full_name" character varying, "company_name" character varying, "website" character varying, CONSTRAINT "PK_7ab129212e4ce89e68d6a27ea4e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "installment" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "transact_reference_id" character varying(50), "merchant_reference_id" character varying(50), "event_name" character varying(20) DEFAULT 'Created', "event_date" date, "resulting_status" character varying(20), "return_code " character varying(3), "return_explanation" character varying(255), "verification_status" character varying(3), "verification_code " character varying(3), "verification_description" character varying(100), "amount" numeric, "is_skipped" boolean, "monthly_report_id" integer, "investor_id" integer, "loanId" integer, CONSTRAINT "PK_c79b5b68e8b6293a0210ce7dbda" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "loan" ("id" SERIAL NOT NULL, "amount_to_be_deposited" integer NOT NULL, "total_payback" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "next_payment_date" TIMESTAMP, "final_payment_date" TIMESTAMP, "loan_status" character varying NOT NULL, "business_owner_id" integer, "investment_request_id" integer, "application_fee_id" integer, CONSTRAINT "REL_cac6322f9371f48fe37b7ecdb1" UNIQUE ("investment_request_id"), CONSTRAINT "REL_c2865ee335cfe27fa6879b88ef" UNIQUE ("application_fee_id"), CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "transact_reference_id" character varying(50) NOT NULL, "merchant_reference_id" character varying(50) NOT NULL, "event_name" character varying(20) DEFAULT 'Created', "event_date" date, "resulting_status" character varying(20), "return_code " character varying(3), "return_explanation" character varying(255), "verification_status" character varying(3), "verification_code" character varying(3), "verification_description" character varying(100), "have_been_retried" boolean, "was_investor_notified" boolean, "application_fee" integer, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "investments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "investor_id" integer, "investment_request_id" integer, "payment_from_investor_id" integer, "payment_to_business_owner_id" integer, CONSTRAINT "REL_86c2bb2fbd5667eb509eca66e3" UNIQUE ("payment_from_investor_id"), CONSTRAINT "REL_5e3e9d6febfe1f704f0bf7b276" UNIQUE ("payment_to_business_owner_id"), CONSTRAINT "PK_a1263853f1a4fb8b849c1c9aff4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "investment_requests" ("id" SERIAL NOT NULL, "purpose_of_the_loan" character varying NOT NULL, "return_term" integer NOT NULL, "net_return" integer NOT NULL DEFAULT '0', "net_return_to_share" integer NOT NULL DEFAULT '0', "rating" character varying, "rating_update" character varying, "dti" character varying, "status" character varying, "loan_purpose" character varying NOT NULL, "help_increase_profit" character varying NOT NULL, "profit_increase" integer NOT NULL, "required_capital" integer NOT NULL, "approved_at" TIMESTAMP DEFAULT now(), "expires_at" TIMESTAMP DEFAULT now(), "is_extended" boolean, "loan_id" integer, "business_owner_id" integer, CONSTRAINT "REL_2b800fd137ebe40cb9e038ef3e" UNIQUE ("loan_id"), CONSTRAINT "PK_4076d188494b9f8abd29a44c498" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying NOT NULL, "data" bytea NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "businesses" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "business_sectors" ("id" integer NOT NULL, "name" character varying NOT NULL, "business_id" integer, CONSTRAINT "PK_5ccb170e0e2467015ea532307e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "business_subsectors" ("id" integer NOT NULL, "name" character varying NOT NULL, "forbidden" boolean NOT NULL, "sector_id" integer, CONSTRAINT "PK_dd6b647e3744de712e41d1465e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "identity_scores" ("id" SERIAL NOT NULL, "owner_name_score" integer, "phone_score" integer, "email_score" integer, "address_score" integer, "identity_score" integer, CONSTRAINT "REL_8cc3a193c268aa1b9e665527b4" UNIQUE ("identity_score"), CONSTRAINT "PK_1f11c8b05f4c92c8235666af953" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "business_owners" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP NOT NULL DEFAULT now(), "survey_completed_at" TIMESTAMP NOT NULL DEFAULT now(), "business_structure" character varying, "company_name" character varying, "owner_name" character varying, "street" character varying, "city" character varying, "zip_code" character varying, "phone" character varying, "website" character varying, "description" character varying, "avr_monthly_sales" integer, "avr_monthly_net_profit" integer, "total_last_year_net_profit" integer, "employees_no" integer, "is_profile_complete" boolean NOT NULL DEFAULT false, "business_subsector_id" integer, "image" uuid, "identity_score" integer, CONSTRAINT "REL_bfe0082df20e8f2ab81908e0c8" UNIQUE ("image"), CONSTRAINT "REL_41a9c56bf8d5974bc33ee0834d" UNIQUE ("identity_score"), CONSTRAINT "PK_177492f4438d9e389e4c63d1064" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rating_range" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "rating" character varying NOT NULL, "low" double precision NOT NULL, "high" double precision NOT NULL, CONSTRAINT "PK_db346ec191ff63aa0f209675d19" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "global_settings" ("id" SERIAL NOT NULL, "max_return_term_wo_manual_processing" integer NOT NULL, "R" double precision NOT NULL, "M" double precision NOT NULL, "A" double precision NOT NULL, "raising_time_limit" integer NOT NULL, "application_fee" integer NOT NULL, "min_loan" integer NOT NULL, "max_loan" integer NOT NULL, "invalid_transaction_penalty" integer NOT NULL, "plaid_token_penalty" integer NOT NULL, CONSTRAINT "PK_fec5e2c0bf238e30b25d4a82976" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "penalties" ADD CONSTRAINT "FK_73b1b42661c8835b17499eac8e5" FOREIGN KEY ("business_owner_id") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "penalties" ADD CONSTRAINT "FK_11b7570404e978fc06cf1de9c45" FOREIGN KEY ("payment_from_business_owner_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "penalties" ADD CONSTRAINT "FK_30d52df3a05914e81dc2cd29ebe" FOREIGN KEY ("payment_to_admin_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "credit_rating_data" ADD CONSTRAINT "FK_8900af06bc289aa1f6fd9d030ff" FOREIGN KEY ("investment_request_id") REFERENCES "investment_requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" ADD CONSTRAINT "FK_cf8e6e8153a681565d8153650ba" FOREIGN KEY ("monthly_report") REFERENCES "monthly_reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_2365fdc34c00f7806be46ee61a6" FOREIGN KEY ("business_owner_id") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_5ab6abe05e75b798ae936374a79" FOREIGN KEY ("credit_rating_data_id") REFERENCES "credit_rating_data"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" ADD CONSTRAINT "FK_08b1ee62514a2c5d2e2caac47a2" FOREIGN KEY ("original_monhly_report") REFERENCES "original_monthly_report"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d6266e4eb3f6dc78825d5c2951b" FOREIGN KEY ("investor_id") REFERENCES "investors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_5e5043caf7062e221ca797e58bb" FOREIGN KEY ("business_owner_id") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD CONSTRAINT "FK_7b3fea4be9252a9ff162521da77" FOREIGN KEY ("monthly_report_id") REFERENCES "monthly_reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD CONSTRAINT "FK_fb43aa0336c382fca91fc6135e2" FOREIGN KEY ("investor_id") REFERENCES "investors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD CONSTRAINT "FK_ad3f1ce44562e50c0de7a6078f8" FOREIGN KEY ("loanId") REFERENCES "loan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "FK_a31686ad3b0f9c2bd9bd9f13814" FOREIGN KEY ("business_owner_id") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "FK_cac6322f9371f48fe37b7ecdb15" FOREIGN KEY ("investment_request_id") REFERENCES "investment_requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "FK_c2865ee335cfe27fa6879b88efb" FOREIGN KEY ("application_fee_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_02d307ca195a2c6e98012389076" FOREIGN KEY ("investor_id") REFERENCES "investors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_cfcce115c585270a0d2ee23d225" FOREIGN KEY ("investment_request_id") REFERENCES "investment_requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_86c2bb2fbd5667eb509eca66e3b" FOREIGN KEY ("payment_from_investor_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_5e3e9d6febfe1f704f0bf7b2767" FOREIGN KEY ("payment_to_business_owner_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD CONSTRAINT "FK_2b800fd137ebe40cb9e038ef3eb" FOREIGN KEY ("loan_id") REFERENCES "loan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD CONSTRAINT "FK_301cc3e03adea6c0afdc51cb3b0" FOREIGN KEY ("business_owner_id") REFERENCES "business_owners"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_sectors" ADD CONSTRAINT "FK_83e5ac99a12514b7d9d7cdd3116" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_subsectors" ADD CONSTRAINT "FK_f3f4f83ba9b6441a6033725a9b3" FOREIGN KEY ("sector_id") REFERENCES "business_sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "identity_scores" ADD CONSTRAINT "FK_8cc3a193c268aa1b9e665527b4a" FOREIGN KEY ("identity_score") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD CONSTRAINT "FK_a8720ef70669c8e95a877271010" FOREIGN KEY ("business_subsector_id") REFERENCES "business_subsectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD CONSTRAINT "FK_bfe0082df20e8f2ab81908e0c82" FOREIGN KEY ("image") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD CONSTRAINT "FK_41a9c56bf8d5974bc33ee0834d0" FOREIGN KEY ("identity_score") REFERENCES "identity_scores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
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
      `ALTER TABLE "business_owners" DROP CONSTRAINT "FK_41a9c56bf8d5974bc33ee0834d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP CONSTRAINT "FK_bfe0082df20e8f2ab81908e0c82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP CONSTRAINT "FK_a8720ef70669c8e95a877271010"`,
    );
    await queryRunner.query(
      `ALTER TABLE "identity_scores" DROP CONSTRAINT "FK_8cc3a193c268aa1b9e665527b4a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_subsectors" DROP CONSTRAINT "FK_f3f4f83ba9b6441a6033725a9b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_sectors" DROP CONSTRAINT "FK_83e5ac99a12514b7d9d7cdd3116"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP CONSTRAINT "FK_301cc3e03adea6c0afdc51cb3b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP CONSTRAINT "FK_2b800fd137ebe40cb9e038ef3eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_5e3e9d6febfe1f704f0bf7b2767"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_86c2bb2fbd5667eb509eca66e3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_cfcce115c585270a0d2ee23d225"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_02d307ca195a2c6e98012389076"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "FK_c2865ee335cfe27fa6879b88efb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "FK_cac6322f9371f48fe37b7ecdb15"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "FK_a31686ad3b0f9c2bd9bd9f13814"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" DROP CONSTRAINT "FK_ad3f1ce44562e50c0de7a6078f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" DROP CONSTRAINT "FK_fb43aa0336c382fca91fc6135e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" DROP CONSTRAINT "FK_7b3fea4be9252a9ff162521da77"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_5e5043caf7062e221ca797e58bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_d6266e4eb3f6dc78825d5c2951b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "FK_08b1ee62514a2c5d2e2caac47a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "FK_5ab6abe05e75b798ae936374a79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monthly_reports" DROP CONSTRAINT "FK_2365fdc34c00f7806be46ee61a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "original_monthly_report" DROP CONSTRAINT "FK_cf8e6e8153a681565d8153650ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "credit_rating_data" DROP CONSTRAINT "FK_8900af06bc289aa1f6fd9d030ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "penalties" DROP CONSTRAINT "FK_30d52df3a05914e81dc2cd29ebe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "penalties" DROP CONSTRAINT "FK_11b7570404e978fc06cf1de9c45"`,
    );
    await queryRunner.query(
      `ALTER TABLE "penalties" DROP CONSTRAINT "FK_73b1b42661c8835b17499eac8e5"`,
    );
    await queryRunner.query(`DROP TABLE "global_settings"`);
    await queryRunner.query(`DROP TABLE "rating_range"`);
    await queryRunner.query(`DROP TABLE "business_owners"`);
    await queryRunner.query(`DROP TABLE "identity_scores"`);
    await queryRunner.query(`DROP TABLE "business_subsectors"`);
    await queryRunner.query(`DROP TABLE "business_sectors"`);
    await queryRunner.query(`DROP TABLE "businesses"`);
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "investment_requests"`);
    await queryRunner.query(`DROP TABLE "investments"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TABLE "loan"`);
    await queryRunner.query(`DROP TABLE "installment"`);
    await queryRunner.query(`DROP TABLE "investors"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "monthly_reports"`);
    await queryRunner.query(`DROP TABLE "original_monthly_report"`);
    await queryRunner.query(`DROP TABLE "credit_rating_data"`);
    await queryRunner.query(`DROP TABLE "penalties"`);
  }
}
