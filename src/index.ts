import axios from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';
import Player from './Player';

export const getPlayerById = async (id: number): Promise<Player | null> => {
  const player = new Player(id);
  return await player.fetchPlayer();
};

export const searchPlayerByName = async (name: string): Promise<(Player | null)[]> => {
  // scrape the page
  const { data } = await axios.get(`https://search.espncricinfo.com/ci/content/site/search.html`, {
    params: {
      search: name,
      type: 'player'
    }
  });
  const $: CheerioAPI = cheerio.load(data);

  const playerIds: number[] = [];
  $(
    '#viewport > div.hp-wrapper > div.hp-container.search > main > div > div.results.in-players > ul > li:not([class])'
  ).each((index, el: any) => {
    const regex = /\d+/;
    const match = regex.exec(el.children[3].children[0].attribs.href);
    if (match) {
      playerIds.push(parseInt(match[0]));
    }
  });
  
  // fetch the players with the given ids
  const players: (Player | null)[] = await Promise.all(playerIds.map(async (id) => {
    const player = new Player(id)
    await player.fetchPlayerDetails()
    return player
  }));
  return players;
};

