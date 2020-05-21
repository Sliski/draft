//game consts
export const ROWS = ["A", "B", "C", "D"];
export const COLS = ["1", "2", "3", "4", "5", "6", "7", "8"];

const CARDS_COUNT = 30;
const DEFAULT_DECK = [];
for (let i = 1; i <= CARDS_COUNT; i += 1) {
  DEFAULT_DECK.push({ id: i, name: `Card ${i}` });
}

const DEFAULT_TABLE = {};
ROWS.map(row => COLS.map(col => (DEFAULT_TABLE[`${row}${col}`] = [])));

export const DEFAULT_GAME_STATE = {
  table: JSON.parse(JSON.stringify(DEFAULT_TABLE)),
  deck: JSON.parse(JSON.stringify(DEFAULT_DECK)),
  hands: { A: [], B: [] },
  choices: { A: null, B: null }
};
