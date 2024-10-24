import {
  yearFive,
  yearFour,
  yearOne,
  yearThree,
  yearTwo,
} from '../modules/investment-request/models/years.const';
import { MigrationInterface, QueryRunner } from 'typeorm';

const ratingRanges = [
  { year: 1, ranges: yearOne },
  { year: 2, ranges: yearTwo },
  { year: 3, ranges: yearThree },
  { year: 4, ranges: yearFour },
  { year: 5, ranges: yearFive },
];

export class DefaultRating1702051681279 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const { year, ranges } of ratingRanges) {
      for (const { rating, valueRange } of ranges) {
        const [low, high] = valueRange;
        await queryRunner.query(`
            INSERT INTO rating_range (year, rating, low, high) 
            VALUES (${year}, '${rating}', ${low}, ${high})
        `);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const yearsToDelete = ratingRanges.map(({ year }) => year);
    await queryRunner.query(`
      DELETE FROM rating_range 
      WHERE year IN (${yearsToDelete.join(', ')})
    `);
  }
}
