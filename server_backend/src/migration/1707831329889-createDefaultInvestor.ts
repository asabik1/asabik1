import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class createDefaultInvestor1707831329889 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashPassword = await bcrypt.hash('Test123!', 12);
    await queryRunner.query(
      `INSERT INTO users (email, password, email_confirmed, account_activatation_token, role, survey_status, plaid_token) VALUES ('admin-investor@email.com', '${hashPassword}', true, 'to123ken', 'investor', 'qualifies', 'default_token')`,
    );

    await queryRunner.query(
      `INSERT INTO investors (full_name) VALUES ('Admin Investor')`,
    );

    await queryRunner.query(
      `UPDATE users SET investor_id = (SELECT id FROM investors WHERE full_name = 'Admin Investor') WHERE email = 'admin-investor@email.com'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE users SET investor_id = NULL WHERE email = 'admin-investor@email.com'`,
    );

    await queryRunner.query(
      `DELETE FROM investors WHERE full_name = 'Admin Investor'`,
    );

    await queryRunner.query(
      `DELETE FROM users WHERE email = 'admin-investor@email.com'`,
    );
  }
}
