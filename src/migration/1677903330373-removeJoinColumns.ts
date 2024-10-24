import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeJoinColumns1677903330373 implements MigrationInterface {
  name = 'removeJoinColumns1677903330373';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investors" DROP CONSTRAINT "FK_d7331f945166b6fe04f9b9c5d91"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP CONSTRAINT "FK_2a92beb4988e9278b044ededed6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" DROP CONSTRAINT "REL_d7331f945166b6fe04f9b9c5d9"`,
    );
    await queryRunner.query(`ALTER TABLE "investors" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP CONSTRAINT "REL_2a92beb4988e9278b044ededed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "user_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "user_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD CONSTRAINT "REL_2a92beb4988e9278b044ededed" UNIQUE ("user_id")`,
    );
    await queryRunner.query(`ALTER TABLE "investors" ADD "user_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "investors" ADD CONSTRAINT "REL_d7331f945166b6fe04f9b9c5d9" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD CONSTRAINT "FK_2a92beb4988e9278b044ededed6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD CONSTRAINT "FK_d7331f945166b6fe04f9b9c5d91" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
