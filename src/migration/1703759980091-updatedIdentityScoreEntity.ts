import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedIdentityScoreEntity1703759980091
  implements MigrationInterface
{
  name = 'updatedIdentityScoreEntity1703759980091';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity_scores" ADD "identity_score" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "identity_scores" ADD CONSTRAINT "UQ_8cc3a193c268aa1b9e665527b4a" UNIQUE ("identity_score")`,
    );
    await queryRunner.query(
      `ALTER TABLE "identity_scores" ADD CONSTRAINT "FK_8cc3a193c268aa1b9e665527b4a" FOREIGN KEY ("identity_score") REFERENCES "business_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity_scores" DROP CONSTRAINT "FK_8cc3a193c268aa1b9e665527b4a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "identity_scores" DROP CONSTRAINT "UQ_8cc3a193c268aa1b9e665527b4a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "identity_scores" DROP COLUMN "identity_score"`,
    );
  }
}
