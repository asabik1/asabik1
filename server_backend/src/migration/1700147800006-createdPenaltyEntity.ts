import { MigrationInterface, QueryRunner } from 'typeorm';

export class createdPenaltyEntity1700147800006 implements MigrationInterface {
  name = 'createdPenaltyEntity1700147800006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "penalties" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "penalty_type" character varying NOT NULL, "amount" integer NOT NULL, "is_resolved" boolean NOT NULL DEFAULT false, "business_owner_id" integer, "payment_from_business_owner_id" integer, "payment_to_admin_id" integer, CONSTRAINT "REL_11b7570404e978fc06cf1de9c4" UNIQUE ("payment_from_business_owner_id"), CONSTRAINT "REL_30d52df3a05914e81dc2cd29eb" UNIQUE ("payment_to_admin_id"), CONSTRAINT "PK_c917b09222ad10103d984fc4e7e" PRIMARY KEY ("id"))`,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "penalties" DROP CONSTRAINT "FK_30d52df3a05914e81dc2cd29ebe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "penalties" DROP CONSTRAINT "FK_11b7570404e978fc06cf1de9c45"`,
    );
    await queryRunner.query(
      `ALTER TABLE "penalties" DROP CONSTRAINT "FK_73b1b42661c8835b17499eac8e5"`,
    );
    await queryRunner.query(`DROP TABLE "penalties"`);
  }
}
