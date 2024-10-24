import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUsersData1677891629689 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE users SET investor_id = investors.id FROM investors WHERE users.id = investors.user_id`,
    );
    await queryRunner.query(
      `UPDATE users SET business_owner_id = business_owners.id FROM business_owners WHERE users.id = business_owners.user_id`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE investors SET user_id = users.id FROM users WHERE investors.id = users.investor_id`,
    );
    await queryRunner.query(
      `UPDATE business_owners SET user_id = users.id FROM users WHERE business_owners.id = users.business_owner_id`,
    );
  }
}
