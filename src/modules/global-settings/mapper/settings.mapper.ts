import { Rating } from '../../investment-request/enum/rating.enum';
import { RatingRange } from '../entities/rating-range.entity';
import { RangesResponse } from '../models/ranges-response.interface';
import { RangesRowResponse } from '../models/ranges-row-response.interface';

export function toRating(ratingRange: RatingRange): Rating {
  return ratingRange.rating;
}

export function toRangesResponse(
  yearOne: RatingRange[],
  yearTwo: RatingRange[],
  yearThree: RatingRange[],
  yearFour: RatingRange[],
  yearFive: RatingRange[],
): RangesResponse {
  return {
    yearOne: toRangesRowResponses(yearOne),
    yearTwo: toRangesRowResponses(yearTwo),
    yearThree: toRangesRowResponses(yearThree),
    yearFour: toRangesRowResponses(yearFour),
    yearFive: toRangesRowResponses(yearFive),
  };
}

export function toRangesRowResponses(
  ratingRanges: RatingRange[],
): RangesRowResponse[] {
  return ratingRanges
    .sort((a, b) => a.low - b.low)
    .map((ratingRange) => {
      return {
        rating: ratingRange.rating,
        low: ratingRange.low,
        high: ratingRange.high,
      };
    });
}

export function toRangesRowResponse(
  ratingRange: RatingRange,
): RangesRowResponse {
  return {
    rating: ratingRange.rating,
    low: ratingRange.low,
    high: ratingRange.high,
  };
}
