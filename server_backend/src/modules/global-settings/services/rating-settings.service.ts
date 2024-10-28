import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import {
  Observable,
  catchError,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
} from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  LessThan,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { RatingRange } from '../entities/rating-range.entity';
import { UpdateRatingDto } from '../dto/update-rating.dto';
import { RangesResponse } from '../models/ranges-response.interface';
import { Rating } from '../../investment-request/enum/rating.enum';
import {
  toRangesResponse,
  toRangesRowResponse,
  toRangesRowResponses,
  toRating,
} from '../mapper/settings.mapper';
import { RangesRowResponse } from '../models/ranges-row-response.interface';

@Injectable()
export class RatingSettingsService {
  constructor(
    @InjectRepository(RatingRange)
    private readonly ratingRangeRepository: Repository<RatingRange>,
  ) {}

  findRatingBoundary(year: number): Observable<number> {
    return from(
      this.ratingRangeRepository.findOne({
        where: {
          year: year,
          rating: Rating.Baa3,
        },
      }),
    ).pipe(map((ratingRange) => ratingRange.high));
  }

  findRatingsByYear(year: number): Observable<RatingRange[]> {
    return from(
      this.ratingRangeRepository.find({
        where: { year: year },
        order: { low: 'ASC' },
      }),
    ).pipe(
      catchError(() => {
        throw new HttpException('No Retings found.', HttpStatus.NOT_FOUND);
      }),
    );
  }

  getRatingsByYear(year: number): Observable<RangesRowResponse[]> {
    return this.findRatingsByYear(year).pipe(
      map((ranges) => ranges.map((range) => toRangesRowResponse(range))),
      catchError((err) => {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      }),
    );
  }

  getRatingByYearAndScore(
    year: number,
    score: number,
  ): Observable<RangesRowResponse> {
    if (score == 0) {
      return from(
        this.ratingRangeRepository.findOneOrFail({
          where: {
            year: year,
            low: score,
          },
        }),
      ).pipe(
        map((ratingRange) => toRangesRowResponse(ratingRange)),
        catchError((err) => {
          throw new HttpException(err, HttpStatus.NOT_FOUND);
        }),
      );
    }

    return from(
      this.ratingRangeRepository.findOneOrFail({
        where: {
          year: year,
          low: LessThan(score),
          high: MoreThanOrEqual(score),
        },
      }),
    ).pipe(
      map((ratingRange) => toRangesRowResponse(ratingRange)),
      catchError((err) => {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      }),
    );
  }

  getRatings(): Observable<RangesResponse> {
    return forkJoin({
      yearOne: this.findRatingsByYear(1),
      yearTwo: this.findRatingsByYear(2),
      yearThree: this.findRatingsByYear(3),
      yearFour: this.findRatingsByYear(4),
      yearFive: this.findRatingsByYear(5),
    }).pipe(
      map((data) =>
        toRangesResponse(
          data.yearOne,
          data.yearTwo,
          data.yearThree,
          data.yearFour,
          data.yearFive,
        ),
      ),
    );
  }

  updateRanges(updateRatings: UpdateRatingDto): Observable<void> {
    const sortedRows = updateRatings.rangesRowUpdate.sort(
      (a, b) => a.low - b.low,
    );

    if (
      sortedRows[0].low !== 0 ||
      sortedRows[sortedRows.length - 1].high !== 1
    ) {
      throw new HttpException('Invalid Range input!', HttpStatus.BAD_REQUEST);
    }

    const ratingValues: Rating[] = Object.values(Rating);

    for (let i = 1; i < sortedRows.length; i++) {
      const currentRange: RangesRowResponse = {
        rating: sortedRows[i].rating,
        low: sortedRows[i].low,
        high: sortedRows[i].high,
      };

      const previousRange: RangesRowResponse = {
        rating: sortedRows[i - 1].rating,
        low: sortedRows[i - 1].low,
        high: sortedRows[i - 1].high,
      };

      if (
        i == 1 &&
        (previousRange.low !== 0 ||
          previousRange.rating !== ratingValues[i - 1])
      ) {
        throw new HttpException('Invalid Range input!', HttpStatus.BAD_REQUEST);
      } else if (
        currentRange.low !== previousRange.high ||
        currentRange.rating !== ratingValues[i]
      ) {
        throw new HttpException('Invalid Range input!', HttpStatus.BAD_REQUEST);
      } else if (
        i == ratingValues.length - 1 &&
        (currentRange.high !== 1 ||
          currentRange.rating !== ratingValues[ratingValues.length - 1])
      ) {
        throw new HttpException('Invalid Range input!', HttpStatus.BAD_REQUEST);
      }
    }

    return this.findRatingsByYear(updateRatings.year).pipe(
      mergeMap((ratings) =>
        ratings.map((rating) =>
          updateRatings.rangesRowUpdate
            .filter((ratingUpdate) => ratingUpdate.rating == rating.rating)
            .map((ratingUpdate) =>
              this.updateRatingRange(rating.id, ratingUpdate),
            ),
        ),
      ),
      map(() => {}),
    );
  }

  updateRatingRange(
    id: number,
    ratingRange: DeepPartial<RatingRange>,
  ): Observable<void> {
    return from(this.ratingRangeRepository.update(id, ratingRange)).pipe(
      map(() => {}),
    );
  }
}
