import BattingStatInterface from './BattingStatInterface';
import FormatStatsInterface from './FormatStatsInterface';

interface PlayerInterface {
  id: number;
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  dateOfBirth: Date;
  flag: {
    imgUrl: string;
    imgAlt: string;
  };
  imgUrl: string;
  stats: {
    test: FormatStatsInterface;
    odi: FormatStatsInterface;
    t20i: FormatStatsInterface;
    fc: FormatStatsInterface;
    listA: FormatStatsInterface;
    t20: FormatStatsInterface;
  };
}

export default PlayerInterface;
