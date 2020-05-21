import React, { Component } from "react";
import { defaultExporter } from "../io/reducer";
import { getCurrentGames, joinGame, createGame } from "../io/socket";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Input,
  Button
} from "@material-ui/core";

class GamesList extends Component {
  constructor(props) {
    super(props);

    this.state = { newGameName: "" };
  }

  componentDidMount() {
    getCurrentGames();
  }

  renderGame = game => {
    const { players, id, name } = game;
    return (
      <ListItem key={id} divider>
        <ListItemText>
          {`${name} - players: ${players.A}${
            players.B ? `, ${players.B}` : ""
          }`}
        </ListItemText>
        {!players.B && (
          <ListItemSecondaryAction>
            <Button onClick={() => joinGame(game.id)}>Join</Button>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  };

  render() {
    const { newGameName } = this.state;
    const { games } = this.props;
    return (
      <Paper>
        <Typography>{"Games:"}</Typography>
        <List>
          {games
            ? games.map(game => this.renderGame(game))
            : "Loading games list..."}
        </List>
        <Input
          placeholder="New Game Name"
          onChange={event => this.setState({ newGameName: event.target.value })}
        />
        <Button onClick={() => createGame(newGameName)} disabled={!newGameName}>
          {"Create game"}
        </Button>
      </Paper>
    );
  }
}

export default defaultExporter(GamesList);
