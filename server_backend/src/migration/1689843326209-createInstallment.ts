import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInstallment1689843326209 implements MigrationInterface {
  name = 'CreateInstallment1689843326209';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_5e3e9d6febfe1f704f0bf7b2767"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_86c2bb2fbd5667eb509eca66e3b"`,
    );
    await queryRunner.query(
      `CREATE TABLE "loan" ("id" SERIAL NOT NULL, "raised" integer NOT NULL, "total_payback" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "final_payment_date" TIMESTAMP NOT NULL DEFAULT now(), "loan_status" character varying NOT NULL, "business_owner_id" integer, CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "installment" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "transact_reference_id" character varying(50) NOT NULL, "merchant_reference_id" character varying(50) NOT NULL, "event_name" character varying(20) DEFAULT 'Created', "event_date" date, "resulting_status" character varying(20), "return_code " character varying(3), "return_explanation" character varying(255), "verification_status" character varying(3), "verification_code " character varying(3), "verification_description" character varying(100), "is_last" boolean NOT NULL, "date_scheduled" character varying NOT NULL, "amount" integer NOT NULL, "loanId" integer, CONSTRAINT "PK_c79b5b68e8b6293a0210ce7dbda" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "global_settings" ("id" SERIAL NOT NULL, "max_return_term_wo_manual_processing" integer NOT NULL, "R" integer NOT NULL, "M" integer NOT NULL, "A" integer NOT NULL, "raising_time_limit" integer NOT NULL, "application_fee" integer NOT NULL, "min_loan" integer NOT NULL, "max_loan" integer NOT NULL, CONSTRAINT "PK_fec5e2c0bf238e30b25d4a82976" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "UQ_86c2bb2fbd5667eb509eca66e3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP COLUMN "payment_from_investor_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "UQ_5e3e9d6febfe1f704f0bf7b2767"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP COLUMN "payment_to_business_owner_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "rating"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "have_been_retried" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD "was_investor_notified" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD "installmentId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "net_return_to_share" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "rating" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "dti" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "approved_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "expires_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD "loan" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD CONSTRAINT "UQ_3662ddeed887187934694011809" UNIQUE ("loan")`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "FK_a31686ad3b0f9c2bd9bd9f13814" FOREIGN KEY ("business_owner_id") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD CONSTRAINT "FK_ad3f1ce44562e50c0de7a6078f8" FOREIGN KEY ("loanId") REFERENCES "loan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_34a326a402b702221f95301df08" FOREIGN KEY ("installmentId") REFERENCES "installment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" ADD CONSTRAINT "FK_3662ddeed887187934694011809" FOREIGN KEY ("loan") REFERENCES "loan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP CONSTRAINT "FK_3662ddeed887187934694011809"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_34a326a402b702221f95301df08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" DROP CONSTRAINT "FK_ad3f1ce44562e50c0de7a6078f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "FK_a31686ad3b0f9c2bd9bd9f13814"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP CONSTRAINT "UQ_3662ddeed887187934694011809"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "loan"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "expires_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "approved_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "dti"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "rating"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_requests" DROP COLUMN "net_return_to_share"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP COLUMN "installmentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP COLUMN "was_investor_notified"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP COLUMN "have_been_retried"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "rating" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD "payment_to_business_owner_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "UQ_5e3e9d6febfe1f704f0bf7b2767" UNIQUE ("payment_to_business_owner_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD "payment_from_investor_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "UQ_86c2bb2fbd5667eb509eca66e3b" UNIQUE ("payment_from_investor_id")`,
    );
    await queryRunner.query(`DROP TABLE "global_settings"`);
    await queryRunner.query(`DROP TABLE "installment"`);
    await queryRunner.query(`DROP TABLE "loan"`);
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_86c2bb2fbd5667eb509eca66e3b" FOREIGN KEY ("payment_from_investor_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_5e3e9d6febfe1f704f0bf7b2767" FOREIGN KEY ("payment_to_business_owner_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
