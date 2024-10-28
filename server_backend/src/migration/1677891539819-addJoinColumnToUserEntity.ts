import { MigrationInterface, QueryRunner } from 'typeorm';

export class addJoinColumnToUserEntity1677891539819
  implements MigrationInterface
{
  name = 'addJoinColumnToUserEntity1677891539819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "investor_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_d6266e4eb3f6dc78825d5c2951b" UNIQUE ("investor_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "business_owner_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_5e5043caf7062e221ca797e58bb" UNIQUE ("business_owner_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d6266e4eb3f6dc78825d5c2951b" FOREIGN KEY ("investor_id") REFERENCES "investors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_5e5043caf7062e221ca797e58bb" FOREIGN KEY ("business_owner_id") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_5e5043caf7062e221ca797e58bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_d6266e4eb3f6dc78825d5c2951b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_5e5043caf7062e221ca797e58bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "business_owner_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_d6266e4eb3f6dc78825d5c2951b"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "investor_id"`);
  }
}
