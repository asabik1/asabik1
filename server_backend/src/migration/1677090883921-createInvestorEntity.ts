import { MigrationInterface, QueryRunner } from 'typeorm';

export class createInvestorEntity1677090883921 implements MigrationInterface {
  name = 'createInvestorEntity1677090883921';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "investors" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "companyName" character varying NOT NULL, "webSite" character varying NOT NULL, "user_id" integer, CONSTRAINT "REL_d7331f945166b6fe04f9b9c5d9" UNIQUE ("user_id"), CONSTRAINT "PK_7ab129212e4ce89e68d6a27ea4e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "investor_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_d6266e4eb3f6dc78825d5c2951b" UNIQUE ("investor_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD CONSTRAINT "FK_d7331f945166b6fe04f9b9c5d91" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d6266e4eb3f6dc78825d5c2951b" FOREIGN KEY ("investor_id") REFERENCES "investors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_d6266e4eb3f6dc78825d5c2951b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" DROP CONSTRAINT "FK_d7331f945166b6fe04f9b9c5d91"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_d6266e4eb3f6dc78825d5c2951b"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "investor_id"`);
    await queryRunner.query(`DROP TABLE "investors"`);
  }
}
