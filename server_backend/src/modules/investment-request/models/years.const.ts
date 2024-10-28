import { Rating } from '../enum/rating.enum';
import { RangesRow } from './ranges.interface';

export const yearOne: RangesRow[] = [
  { rating: Rating.Aaa, valueRange: [0.0, 0.000003] },
  { rating: Rating.Aa1, valueRange: [0.000003, 0.000018] },
  { rating: Rating.Aa2, valueRange: [0.000018, 0.000042] },
  { rating: Rating.Aa3, valueRange: [0.000042, 0.00009] },
  { rating: Rating.A1, valueRange: [0.00009, 0.000174] },
  { rating: Rating.A2, valueRange: [0.000174, 0.000327] },
  { rating: Rating.A3, valueRange: [0.000327, 0.001167] },
  { rating: Rating.Baa1, valueRange: [0.001167, 0.0027] },
  { rating: Rating.Baa2, valueRange: [0.0027, 0.0051] },
  { rating: Rating.Baa3, valueRange: [0.0051, 0.0126] },
  { rating: Rating.JUNK, valueRange: [0.0126, 1] },
];

export const yearTwo: RangesRow[] = [
  { rating: Rating.Aaa, valueRange: [0.0, 0.000006] },
  { rating: Rating.Aa1, valueRange: [0.000006, 0.00009] },
  { rating: Rating.Aa2, valueRange: [0.00009, 0.00024] },
  { rating: Rating.Aa3, valueRange: [0.00024, 0.00057] },
  { rating: Rating.A1, valueRange: [0.00057, 0.00111] },
  { rating: Rating.A2, valueRange: [0.00111, 0.0021] },
  { rating: Rating.A3, valueRange: [0.0021, 0.0045] },
  { rating: Rating.Baa1, valueRange: [0.0045, 0.0084] },
  { rating: Rating.Baa2, valueRange: [0.0084, 0.0141] },
  { rating: Rating.Baa3, valueRange: [0.0141, 0.0315] },
  { rating: Rating.JUNK, valueRange: [0.0315, 1] },
];

export const yearThree: RangesRow[] = [
  { rating: Rating.Aaa, valueRange: [0.0, 0.000021] },
  { rating: Rating.Aa1, valueRange: [0.000021, 0.0003] },
  { rating: Rating.Aa2, valueRange: [0.0003, 0.00078] },
  { rating: Rating.Aa3, valueRange: [0.00078, 0.00177] },
  { rating: Rating.A1, valueRange: [0.00177, 0.00351] },
  { rating: Rating.A2, valueRange: [0.00351, 0.00666] },
  { rating: Rating.A3, valueRange: [0.00666, 0.0108] },
  { rating: Rating.Baa1, valueRange: [0.0108, 0.0168] },
  { rating: Rating.Baa2, valueRange: [0.0168, 0.0249] },
  { rating: Rating.Baa3, valueRange: [0.0249, 0.0513] },
  { rating: Rating.JUNK, valueRange: [0.0513, 1] },
];

export const yearFour: RangesRow[] = [
  { rating: Rating.Aaa, valueRange: [0.0, 0.000054] },
  { rating: Rating.Aa1, valueRange: [0.000054, 0.00063] },
  { rating: Rating.Aa2, valueRange: [0.00063, 0.00141] },
  { rating: Rating.Aa3, valueRange: [0.00141, 0.00303] },
  { rating: Rating.A1, valueRange: [0.00303, 0.00567] },
  { rating: Rating.A2, valueRange: [0.00567, 0.01035] },
  { rating: Rating.A3, valueRange: [0.01035, 0.0162] },
  { rating: Rating.Baa1, valueRange: [0.0162, 0.0249] },
  { rating: Rating.Baa2, valueRange: [0.0249, 0.036] },
  { rating: Rating.Baa3, valueRange: [0.036, 0.0714] },
  { rating: Rating.JUNK, valueRange: [0.0714, 1] },
];

export const yearFive: RangesRow[] = [
  { rating: Rating.Aaa, valueRange: [0.0, 0.000087] },
  { rating: Rating.Aa1, valueRange: [0.000087, 0.00093] },
  { rating: Rating.Aa2, valueRange: [0.00093, 0.00204] },
  { rating: Rating.Aa3, valueRange: [0.00204, 0.00426] },
  { rating: Rating.A1, valueRange: [0.00426, 0.00783] },
  { rating: Rating.A2, valueRange: [0.00783, 0.01401] },
  { rating: Rating.A3, valueRange: [0.01401, 0.0219] },
  { rating: Rating.Baa1, valueRange: [0.0219, 0.033] },
  { rating: Rating.Baa2, valueRange: [0.033, 0.0474] },
  { rating: Rating.Baa3, valueRange: [0.0474, 0.0915] },
  { rating: Rating.JUNK, valueRange: [0.0915, 1] },
];
