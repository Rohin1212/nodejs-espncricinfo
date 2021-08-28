interface BattingStatInterface {
  matches: number;
  innings: number;
  notOuts: number;
  runs: number;
  highestScore: number;
  average: number;
  ballsFaced: number;
  strikeRate: number;
  hundreds: number;
  fifties: number;
  fours: number;
  sixes: number;
  catchesTaken: number;
  stumpings: number;
  [key: string]: number;
}
export default BattingStatInterface;
