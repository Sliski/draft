import express from "express";
import { Server } from "http";
import SocketIO from "socket.io";
import cors from "cors";
import { DEFAULT_GAME_STATE, ROWS, COLS } from "./game/defaults";
import { dealNewHands } from "./game/steps";

const app = express();
const server = Server(app);
const io = SocketIO(server);

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

//my little DB
let games = {};
let gameStates = {};
//noop?
let onlineUsersNames = [];
let onlineUsers = [];

const currentGameState = gameId => ({
  ...gameStates[gameId],
  ...games[gameId]
});

//helpers
const currentPlayer = (username, gameId) =>
  games[gameId].players.A === username ? "A" : "B";

//backup server reset
app.get("/res", (req, res) => {
  games = {};
  gameStates = {};
  res.send("Reset done!");
});

// listen on port 8001
server.listen(8001, () => console.log("connected to port 8001!"));

// only use this for dev purposes
app.use(cors());

//io behaviors
io.on("connection", socket => {
  //choose username
  socket.on(REQUESTS.CHOOSE_USERNAME, newUsername => {
    if (!newUsername) {
      return socket.emit(
        RESPONSES.FORBIDDEN_ACTION,
        "Non empty username required."
      );
    }
    if (onlineUsersNames.includes(newUsername)) {
      return socket.emit(
        RESPONSES.USERNAME_IN_USE,
        "Choose different username."
      );
    }
    socket.username = newUsername;

    //TODO why not push?
    onlineUsers = [...onlineUsers, { socketId: socket.id, newUsername }];
    return socket.emit(RESPONSES.USERNAME_ACCEPTED, newUsername);
  });

  //game
  socket.on(REQUESTS.GET_CURRENT_GAME_STATE, requestedGameId => {
    const gameState = currentGameState(requestedGameId);
    if (
      !gameState ||
      !gameState.players ||
      (gameState.players.A !== socket.username &&
        gameState.players.B !== socket.username)
    )
      return;
    socket.gameId = requestedGameId;
    socket.emit(RESPONSES.CURRENT_GAME_STATE, gameState);
  });

  socket.on(REQUESTS.MOVE_CARD, (cardId, from, to) => {
    const { gameId, username } = socket;
    if (!gameId || !username) return;
    // console.log(`Move card: ${gameId}, ${from}, ${to}}`);
    const gameState = gameStates[gameId];
    if (!gameState) return;
    const fromStack = gameState.table[from];
    //card already moved
    if (
      !fromStack ||
      fromStack.length < 1 ||
      fromStack[fromStack.length - 1].id !== cardId
    ) {
      console.log("Error 1");
      return;
    }
    gameStates[gameId].table[to].push(gameStates[gameId].table[from].pop());
    socket.emit(RESPONSES.CURRENT_GAME_STATE, currentGameState(gameId));
    socket.broadcast.emit(
      RESPONSES.CURRENT_GAME_STATE,
      currentGameState(gameId)
    );
  });

  //Lobby
  socket.on(REQUESTS.GET_CURRENT_GAMES, () =>
    socket.emit(RESPONSES.CURRENT_GAMES, games)
  );

  socket.on(REQUESTS.CREATE_GAME, gameName => {
    if (!socket.username || !gameName) return;
    const gameId =
      new Date().getTime() + "_" + Math.floor(Math.random() * 1000);
    games[gameId] = {
      players: { A: socket.username, B: null },
      id: gameId,
      name: gameName
    };
    gameStates[gameId] = {
      id: gameId,
      ...JSON.parse(JSON.stringify(DEFAULT_GAME_STATE))
    };
    gameStates[gameId] = dealNewHands(gameStates[gameId]);
    socket.gameId = gameId;
    socket.emit(RESPONSES.JOINED_GAME, gameId);
    socket.broadcast.emit(RESPONSES.CURRENT_GAMES, games);
  });

  socket.on(REQUESTS.JOIN_GAME, gameId => {
    const game = games[gameId];
    if (
      !game ||
      !socket.username ||
      game.players.A === socket.username ||
      game.players.B
    )
      return;
    game.players.B = socket.username;
    socket.gameId = gameId;
    socket.emit(RESPONSES.JOINED_GAME, gameId);
    socket.broadcast.emit(RESPONSES.CURRENT_GAMES, games);
  });

  socket.on(REQUESTS.CHOOSE_CARD, cardNo => {
    const { username, gameId } = socket;
    const player = currentPlayer(username, gameId);
    if (!player) return;
    const gameState = gameStates[gameId];
    const { table, hands, choices } = gameState;
    //todo change to proper handling
    choices[player] = cardNo;
    if (choices.A !== null && choices.B !== null) {
      table[`${ROWS[ROWS.length - 1]}${COLS[0]}`].push(
        hands.A.splice(choices.A, 1)[0]
      );
      table[`${ROWS[0]}${COLS[0]}`].push(hands.B.splice(choices.B, 1)[0]);
      choices.A = null;
      choices.B = null;

      if (hands.A.length === 0) {
        //deal new hands
        dealNewHands(gameState);
      } else {
        //or swap hands
        const tempHand = hands.A;
        hands.A = hands.B;
        hands.B = tempHand;
      }
    }
    // gameStates[socket.gameId] = gameState;
    socket.emit(RESPONSES.CURRENT_GAME_STATE, currentGameState(gameId));
    socket.broadcast.emit(
      RESPONSES.CURRENT_GAME_STATE,
      currentGameState(gameId)
    );
  });

  //remove user when disconnects
  socket.on("disconnect", () => {
    const { gameId, id } = socket;
    if (gameId) {
      // delete games[gameId];
      // delete gameStates[gameId];
      socket.broadcast.emit(RESPONSES.CURRENT_GAMES, games);
    }
    onlineUsers = onlineUsers.filter(onlineUser => onlineUser.socketId !== id);
    onlineUsersNames = onlineUsers.map(data => data.name);
  });
});
