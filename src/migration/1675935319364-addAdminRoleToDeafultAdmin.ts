import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAdminRoleToDeafultAdmin1675935319364
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE users SET role = 'admin' WHERE email = 'admin@email.com';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE users SET role = 'business-owner' WHERE email = 'admin@email.com';`,
    );
  }
}
