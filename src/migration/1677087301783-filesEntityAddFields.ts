import { MigrationInterface, QueryRunner } from 'typeorm';

export class filesEntityAddFields1677087301783 implements MigrationInterface {
  name = 'filesEntityAddFields1677087301783';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" ADD "user_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9"`,
    );
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "files" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_a7435dbb7583938d5e7d1376041" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_a7435dbb7583938d5e7d1376041"`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9"`,
    );
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "files" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "user_id"`);
  }
}
