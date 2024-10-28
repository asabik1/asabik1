import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class addDefaultUser1675317247209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashPassword = await bcrypt.hash('Test123!', 12);
    await queryRunner.query(
      `INSERT INTO users (email, password, activated, account_activatation_token) VALUES ('admin@email.com', '${hashPassword}', true, 'to123ken')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE email = 'admin@email.com'`,
    );
  }
}
