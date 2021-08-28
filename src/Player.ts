import axios from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';
import cricketApiInstance from './config/cricketApi';
import FormatStatsInterface from './interfaces/FormatStatsInterface';
import PlayerInterface from './interfaces/PlayerInterface';

class Player implements PlayerInterface {
  public id: number;
  public name: string;
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public age: number;
  public dateOfBirth: Date;
  public flag: { imgUrl: string; imgAlt: string };
  public imgUrl: string;
  public stats: {
    test: FormatStatsInterface;
    odi: FormatStatsInterface;
    t20i: FormatStatsInterface;
    fc: FormatStatsInterface;
    listA: FormatStatsInterface;
    t20: FormatStatsInterface;
    [key: string]: FormatStatsInterface;
  };

  constructor(id: number) {
    this.id = id;
    this.name = '';
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.age = -1;
    this.dateOfBirth = new Date();
    this.flag = { imgUrl: '', imgAlt: '' };
    this.imgUrl = '';

    this.stats = {
      test: {
        batting: {
          matches: -1,
          innings: -1,
          notOuts: -1,
          runs: -1,
          average: -1,
          highestScore: -1,
          ballsFaced: -1,
          strikeRate: -1,
          hundreds: -1,
          fifties: -1,
          fours: -1,
          sixes: -1,
          catchesTaken: -1,
          stumpings: -1
        },
        bowling: {
          matches: -1,
          innings: -1,
          balls: -1,
          runs: -1,
          wickets: -1,
          bestBowlingInnings: '',
          bestBowlingMatches: '',
          average: -1,
          strikeRate: -1,
          economy: -1,
          fourWickets: -1,
          fiveWickets: -1,
          tenWickets: -1
        }
      },
      odi: {
        batting: {
          matches: -1,
          innings: -1,
          notOuts: -1,
          runs: -1,
          average: -1,
          highestScore: -1,
          ballsFaced: -1,
          strikeRate: -1,
          hundreds: -1,
          fifties: -1,
          fours: -1,
          sixes: -1,
          catchesTaken: -1,
          stumpings: -1
        },
        bowling: {
          matches: -1,
          innings: -1,
          balls: -1,
          runs: -1,
          wickets: -1,
          bestBowlingInnings: '',
          bestBowlingMatches: '',
          average: -1,
          strikeRate: -1,
          economy: -1,
          fourWickets: -1,
          fiveWickets: -1,
          tenWickets: -1
        }
      },
      t20i: {
        batting: {
          matches: -1,
          innings: -1,
          notOuts: -1,
          runs: -1,
          average: -1,
          highestScore: -1,
          ballsFaced: -1,
          strikeRate: -1,
          hundreds: -1,
          fifties: -1,
          fours: -1,
          sixes: -1,
          catchesTaken: -1,
          stumpings: -1
        },
        bowling: {
          matches: -1,
          innings: -1,
          balls: -1,
          runs: -1,
          wickets: -1,
          bestBowlingInnings: '',
          bestBowlingMatches: '',
          average: -1,
          strikeRate: -1,
          economy: -1,
          fourWickets: -1,
          fiveWickets: -1,
          tenWickets: -1
        }
      },
      fc: {
        batting: {
          matches: -1,
          innings: -1,
          notOuts: -1,
          runs: -1,
          average: -1,
          highestScore: -1,
          ballsFaced: -1,
          strikeRate: -1,
          hundreds: -1,
          fifties: -1,
          fours: -1,
          sixes: -1,
          catchesTaken: -1,
          stumpings: -1
        },
        bowling: {
          matches: -1,
          innings: -1,
          balls: -1,
          runs: -1,
          wickets: -1,
          bestBowlingInnings: '',
          bestBowlingMatches: '',
          average: -1,
          strikeRate: -1,
          economy: -1,
          fourWickets: -1,
          fiveWickets: -1,
          tenWickets: -1
        }
      },
      listA: {
        batting: {
          matches: -1,
          innings: -1,
          notOuts: -1,
          runs: -1,
          average: -1,
          highestScore: -1,
          ballsFaced: -1,
          strikeRate: -1,
          hundreds: -1,
          fifties: -1,
          fours: -1,
          sixes: -1,
          catchesTaken: -1,
          stumpings: -1
        },
        bowling: {
          matches: -1,
          innings: -1,
          balls: -1,
          runs: -1,
          wickets: -1,
          bestBowlingInnings: '',
          bestBowlingMatches: '',
          average: -1,
          strikeRate: -1,
          economy: -1,
          fourWickets: -1,
          fiveWickets: -1,
          tenWickets: -1
        }
      },
      t20: {
        batting: {
          matches: -1,
          innings: -1,
          notOuts: -1,
          runs: -1,
          average: -1,
          highestScore: -1,
          ballsFaced: -1,
          strikeRate: -1,
          hundreds: -1,
          fifties: -1,
          fours: -1,
          sixes: -1,
          catchesTaken: -1,
          stumpings: -1
        },
        bowling: {
          matches: -1,
          innings: -1,
          balls: -1,
          runs: -1,
          wickets: -1,
          bestBowlingInnings: '',
          bestBowlingMatches: '',
          average: -1,
          strikeRate: -1,
          economy: -1,
          fourWickets: -1,
          fiveWickets: -1,
          tenWickets: -1
        }
      }
    };
  }
  async fetchPlayer(): Promise<Player | null> {
    try {
      await this.fetchPlayerDetails();
      await this.fetchPlayerStats();
      return this;
    } catch (error) {
      return null;
    }
  }

  async fetchPlayerDetails(): Promise<void> {
    try {
      const { data } = await cricketApiInstance.get(`/athletes/${this.id}`);
      this.name = data.name;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.age = data.age;
      this.dateOfBirth = new Date(data.dateOfBirth);
      this.flag = {
        imgUrl: data.flag.href,
        imgAlt: data.flag.alt
      };
      this.imgUrl = data.headshot.href;
    } catch (error: any) {
      if (error.response.status === 404) {
        throw new Error('Player Not Found');
      }
    }
  }

  async fetchPlayerStats(): Promise<any> {
    try {
      const { data } = await axios.get(`https://www.espncricinfo.com/ci/content/player/${this.id}.html`);
      const $: CheerioAPI = cheerio.load(data);
      let formatToScrape: string = '';
      const myStats: any = {
        test: { batting: [], bowling: [] },
        odi: { batting: [], bowling: [] },
        t20i: { batting: [], bowling: [] },
        fc: { batting: [], bowling: [] },
        listA: { batting: [], bowling: [] },
        t20: { batting: [], bowling: [] }
      };
      const callback = (el: any, type: string): void => {
        const text = $(el).text().toLowerCase().replace(' ', '');
        if (/^[a-z]\w*$/i.test(text)) {
          if (text === 'lista') {
            formatToScrape = 'listA';
          } else {
            formatToScrape = text;
          }
          myStats[formatToScrape][type] = [];
        } else {
          myStats[formatToScrape][type].push(text.indexOf('/') > -1 ? text : parseInt(text));
        }
      };
      $(
        '#main-container > div:nth-child(1) > div > div.container > div > div.playerpage-content > div:nth-child(3) > div > div:nth-child(1) > div > table > tbody > tr > td'
      )
        .children()
        .each((index, el) => callback(el, 'batting'));

      $(
        '#main-container > div:nth-child(1) > div > div.container > div > div.playerpage-content > div:nth-child(3) > div > div:nth-child(2) > div > table > tbody > tr > td'
      )
        .children()
        .each((index, el) => callback(el, 'bowling'));

      Object.keys(myStats).forEach((key: string) => {
        // set batting stats
        this.stats[key].batting.matches = myStats[key].batting[0];
        this.stats[key].batting.innings = myStats[key].batting[1];
        this.stats[key].batting.notOuts = myStats[key].batting[2];
        this.stats[key].batting.runs = myStats[key].batting[3];
        this.stats[key].batting.highestScore = myStats[key].batting[4];
        this.stats[key].batting.average = myStats[key].batting[5];
        this.stats[key].batting.ballsFaced = myStats[key].batting[6];
        this.stats[key].batting.strikeRate = myStats[key].batting[7];
        this.stats[key].batting.hundreds = myStats[key].batting[8];
        this.stats[key].batting.fifties = myStats[key].batting[9];
        this.stats[key].batting.fours = myStats[key].batting[10];
        this.stats[key].batting.sixes = myStats[key].batting[11];
        this.stats[key].batting.catchesTaken = myStats[key].batting[12];
        this.stats[key].batting.stumpings = myStats[key].batting[13];

        // set bowling stats
        this.stats[key].bowling.matches = myStats[key].bowling[0];
        this.stats[key].bowling.innings = myStats[key].bowling[1];
        this.stats[key].bowling.balls = myStats[key].bowling[2];
        this.stats[key].bowling.runs = myStats[key].bowling[3];
        this.stats[key].bowling.wickets = myStats[key].bowling[4];
        this.stats[key].bowling.bestBowlingInnings = myStats[key].bowling[5];
        this.stats[key].bowling.bestBowlingMatches = myStats[key].bowling[6];
        this.stats[key].bowling.average = myStats[key].bowling[7];
        this.stats[key].bowling.economy = myStats[key].bowling[8];
        this.stats[key].bowling.strikeRate = myStats[key].bowling[9];
        this.stats[key].bowling.fourWickets = myStats[key].bowling[10];
        this.stats[key].bowling.fiveWickets = myStats[key].bowling[11];
        this.stats[key].bowling.tenWickets = myStats[key].bowling[12];
      });
    } catch (error: any) {
      if (error.statusCode === 404) {
        throw new Error('Player Not Found');
      }
    }
  }
}
export default Player;
