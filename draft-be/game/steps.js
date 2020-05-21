const HAND_SIZE = 5;

export const dealNewHands = gameState => {
  const { deck, hands } = gameState;
  if (deck.length < 2 * HAND_SIZE) {
    console.log("[GAME-ERROR] Not enough cards!");
    return gameState;
  }
  for (let i = 0; i < 7; i += 1) {
    hands.A.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
    hands.B.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
  }
  //TODO how about {hands, deck} and do gameState = {...gameState, ...dealNewHands()} instead of gameState = dealNewHands()
  return gameState;
};
