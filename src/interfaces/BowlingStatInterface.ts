interface BowlingStatInterface {
  matches: number;
  innings: number;
  balls: number;
  runs: number;
  wickets: number;
  bestBowlingInnings: string;
  bestBowlingMatches: string;
  average: number;
  strikeRate: number;
  economy: number;
  fourWickets: number;
  fiveWickets: number;
  tenWickets: number;
  [key: string]: number | string;
}
export default BowlingStatInterface;
