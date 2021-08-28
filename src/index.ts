import Player from './Player';

export const getPlayerById = async (id: number): Promise<Player | null> => {
  const player = new Player(id);
  return await player.fetchPlayer();
};
