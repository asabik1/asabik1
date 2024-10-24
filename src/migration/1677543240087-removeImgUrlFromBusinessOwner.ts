import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeImgUrlFromBusinessOwner1677543240087
  implements MigrationInterface
{
  name = 'removeImgUrlFromBusinessOwner1677543240087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" DROP COLUMN "img_url"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "business_owners" ADD "img_url" character varying`,
    );
  }
}
