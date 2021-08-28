import BattingStatInterface from './BattingStatInterface';
import BowlingStatInterface from './BowlingStatInterface';

interface FormatStatsInterface {
  [key: string]: BattingStatInterface | BowlingStatInterface;
  batting: BattingStatInterface;
  bowling: BowlingStatInterface;
}

export default FormatStatsInterface;
