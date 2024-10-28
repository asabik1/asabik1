import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class alteredAdmin1712037736922 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pass = 'E#1%J&Yi%v}#7$@';
    const passHash = await bcrypt.hash(pass, 12);

    await queryRunner.query(
      `UPDATE users SET email = 'privacy@asabik.com', password = '${passHash}' WHERE role = 'admin';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE role = 'admin';`);
  }
}
