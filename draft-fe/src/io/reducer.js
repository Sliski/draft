import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import styles from "../styles.jsx";

import { TR } from "./socket";
//for possible socket.emit()
//import { socket } from './index';
export const ROWS = ["A", "B", "C", "D"];
export const COLS = ["1", "2", "3", "4", "5", "6", "7", "8"];

const reducer = (
  state = {
    error: "",
    username: null,
    //lobby
    games: [],
    //game
    gameId: null,
    cards: {},
    table: {},
    hands: {},
    choices: {},

    names: []
  },
  action
) => {
  switch (action.type) {
    //default error
    case TR.FORBIDDEN_ACTION:
      state = {
        ...state,
        error: action.error
      };
      break;

    //choose username
    case TR.USERNAME_ACCEPTED:
      localStorage.setItem("username", action.username);
      state = {
        ...state,
        error: "",
        username: action.username
      };
      break;
    case TR.USERNAME_IN_USE:
      state = {
        ...state,
        error: action.error
      };
      break;

    //game
    case TR.CURRENT_GAME_STATE:
      state = {
        ...state,
        ...action.gameState,
        gameId: action.gameState.id,
        me: state.username === action.gameState.players.A ? "A" : "B",
        opp: state.username === action.gameState.players.A ? "B" : "A"
        // myIndex: action.gameState.players[0] === state.username ? "a" : "b",
        // oppIndex: action.gameState.players[0] === state.username ? "b" : "a",
        // boardState: action.gameState.boardState,
        // lastTurnMoves: action.gameState.lastTurnMoves,
        // lockedMoves: action.gameState.lockedMoves,
        // colors: action.gameState.colors,
        // lastTurnScore: action.gameState.lastTurnScore,
        // score: action.gameState.score
      };
      break;

    //lobby
    case TR.CURRENT_GAMES:
      state = {
        ...state,
        games: Object.values(action.games)
      };
      break;
    case TR.JOINED_GAME:
      state = {
        ...state,
        gameId: action.gameId
      };
      break;

    default:
      break;
  }

  return state;
};

export default reducer;

const mapStateToProps = state => {
  return {
    error: state.error,
    username: state.username,
    //lobby
    games: state.games,
    //game
    gameId: state.gameId,
    players: state.players,
    me: state.me,
    opp: state.opp,
    table: state.table,
    hands: state.hands,
    choices: state.choices
  };
};

export const defaultExporter = component => {
  return withStyles(styles)(connect(mapStateToProps)(component));
};
