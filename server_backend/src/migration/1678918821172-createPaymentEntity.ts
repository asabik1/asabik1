import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPaymentEntity1678918821172 implements MigrationInterface {
  name = 'createPaymentEntity1678918821172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "transact_reference_id" character varying(50) NOT NULL, "merchant_reference_id" character varying(50) NOT NULL, "event_name" character varying(20) DEFAULT 'Created', "event_date" TIMESTAMP, "resulting_status" character varying(20), "return_code " character varying(3), "return_explanation" character varying(255), "verification_status" character varying(3), "verification_code " character varying(3), "verification_description" character varying(100), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD "payment_from_investor_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "UQ_86c2bb2fbd5667eb509eca66e3b" UNIQUE ("payment_from_investor_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD "payment_to_business_owner_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "UQ_5e3e9d6febfe1f704f0bf7b2767" UNIQUE ("payment_to_business_owner_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "PK_a1263853f1a4fb8b849c1c9aff4"`,
    );
    await queryRunner.query(`ALTER TABLE "investments" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "investments" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "PK_a1263853f1a4fb8b849c1c9aff4" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_86c2bb2fbd5667eb509eca66e3b" FOREIGN KEY ("payment_from_investor_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_5e3e9d6febfe1f704f0bf7b2767" FOREIGN KEY ("payment_to_business_owner_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_5e3e9d6febfe1f704f0bf7b2767"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_86c2bb2fbd5667eb509eca66e3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "PK_a1263853f1a4fb8b849c1c9aff4"`,
    );
    await queryRunner.query(`ALTER TABLE "investments" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "investments" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "PK_a1263853f1a4fb8b849c1c9aff4" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "UQ_5e3e9d6febfe1f704f0bf7b2767"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP COLUMN "payment_to_business_owner_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "UQ_86c2bb2fbd5667eb509eca66e3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP COLUMN "payment_from_investor_id"`,
    );
    await queryRunner.query(`DROP TABLE "payments"`);
  }
}
