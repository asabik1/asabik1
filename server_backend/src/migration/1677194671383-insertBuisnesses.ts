import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertBuisnesses1677194671383 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    INSERT INTO businesses(id,name) VALUES
    (11,'Agriculture  Forestry Fishing and Hunting')
   ,(21,'Mining  Quarrying  and Oil and Gas Extraction')
   ,(22,'Utilities')
   ,(23,'Construction')
   ,(3133,'Manufacturing')
   ,(42,'Wholesale Trade')
   ,(4445,'Retail Trade')
   ,(51,'Information')
   ,(52,'Finance and Insurance')
   ,(53,'Real Estate and Rental and Leasing')
   ,(54,'Professional  Scientific  and Technical Services')
   ,(55,'Management of Companies and Enterprises')
   ,(56,'Administrative and Support and Waste Management and Remediation Services')
   ,(61,'Educational Services')
   ,(62,'Health Care and Social Assistance')
   ,(71,'Arts  Entertainment  and Recreation')
   ,(72,'Accommodation and Food Services')
   ,(81,'Other Services (except Public Administration)')
   ,(92,'Public Administration');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
DELETE FROM businesses WHERE id= 11;
DELETE FROM businesses WHERE id= 21;
DELETE FROM businesses WHERE id= 22;
DELETE FROM businesses WHERE id= 23;
DELETE FROM businesses WHERE id= 3133;
DELETE FROM businesses WHERE id= 42;
DELETE FROM businesses WHERE id= 4445;
DELETE FROM businesses WHERE id= 51;
DELETE FROM businesses WHERE id= 52;
DELETE FROM businesses WHERE id= 53;
DELETE FROM businesses WHERE id= 54;
DELETE FROM businesses WHERE id= 55;
DELETE FROM businesses WHERE id= 56;
DELETE FROM businesses WHERE id= 61;
DELETE FROM businesses WHERE id= 62;
DELETE FROM businesses WHERE id= 71;
DELETE FROM businesses WHERE id= 72;
DELETE FROM businesses WHERE id= 81;
DELETE FROM businesses WHERE id= 92;`);
  }
}
