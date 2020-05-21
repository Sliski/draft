import io from "socket.io-client";

const REQUESTS = {
  CHOOSE_USERNAME: "CHOOSE_USERNAME",
  MOVE_CARD: "MOVE_CARD",
  GET_CURRENT_GAME_STATE: "GET_CURRENT_GAME_STATE",
  GET_CURRENT_GAMES: "GET_CURRENT_GAMES",
  CREATE_GAME: "CREATE_GAME",
  JOIN_GAME: "JOIN_GAME",
  CHOOSE_CARD: "CHOOSE_CARD"
};

const RESPONSES = {
  USERNAME_IN_USE: "USERNAME_IN_USE",
  USERNAME_ACCEPTED: "USERNAME_ACCEPTED",
  FORBIDDEN_ACTION: "FORBIDDEN_ACTION",
  CURRENT_GAME_STATE: "CURRENT_GAME_STATE",
  CURRENT_GAMES: "CURRENT_GAMES",
  JOINED_GAME: "JOINED_GAME"
};

export const TR = {
  FORBIDDEN_ACTION: "FORBIDDEN_ACTION_TR",
  USERNAME_ACCEPTED: "USERNAME_ACCEPTED_TR",
  USERNAME_IN_USE: "USERNAME_IN_USE_TR",
  CURRENT_GAME_STATE: "CURRENT_GAME_STATE_TR",
  CURRENT_GAMES: "CURRENT_GAMES_TR",
  JOINED_GAME: "JOINED_GAME_TR"
};

// backend address
// const socket = io('http://m3e.nazwa.pl:8001');
const socket = io("http://localhost:8001");

const configureSocket = dispatch => {
  // connect
  socket.on("connect", () => {
    console.log("connected");
  });

  //disconnect
  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  //default error
  socket.on(RESPONSES.FORBIDDEN_ACTION, error =>
    dispatch({ type: TR.FORBIDDEN_ACTION, error })
  );

  //choose username
  socket.on(RESPONSES.USERNAME_ACCEPTED, username =>
    dispatch({ type: TR.USERNAME_ACCEPTED, username })
  );
  socket.on(RESPONSES.USERNAME_IN_USE, username =>
    dispatch({ type: TR.USERNAME_IN_USE, username })
  );

  //game
  socket.on(RESPONSES.CURRENT_GAME_STATE, gameState =>
    dispatch({ type: TR.CURRENT_GAME_STATE, gameState })
  );

  //lobby
  socket.on(RESPONSES.CURRENT_GAMES, games =>
    dispatch({ type: TR.CURRENT_GAMES, games })
  );

  socket.on(RESPONSES.JOINED_GAME, gameId =>
    dispatch({ type: TR.JOINED_GAME, gameId })
  );

  return socket;
};

//username
export const chooseUsername = newUsername =>
  socket.emit(REQUESTS.CHOOSE_USERNAME, newUsername);

//game
export const getCurrentGameState = gameId =>
  socket.emit(REQUESTS.GET_CURRENT_GAME_STATE, gameId);
export const moveCard = (cardId, from, to) =>
  socket.emit(REQUESTS.MOVE_CARD, cardId, from, to);
export const chooseCard = cardNo => socket.emit(REQUESTS.CHOOSE_CARD, cardNo);

//lobby
export const getCurrentGames = () => socket.emit(REQUESTS.GET_CURRENT_GAMES);
export const createGame = name => socket.emit(REQUESTS.CREATE_GAME, name);
export const joinGame = gameId => socket.emit(REQUESTS.JOIN_GAME, gameId);

export default configureSocket;
