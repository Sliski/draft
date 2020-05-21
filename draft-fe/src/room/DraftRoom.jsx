import React, { Component } from "react";
import { defaultExporter } from "../io/reducer";
import { getCurrentGameState } from "../io/socket";
import { Typography, Grid, TextField } from "@material-ui/core";
import Board from "./Board";
import Hand from "./Hand";
import Card from "./Card";

class DraftRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getCurrentGameState(this.props.urlGameId);
  }

  render() {
    const { username, urlGameId, gameId, players, me, opp } = this.props;

    if (!urlGameId || !players || !gameId || gameId !== urlGameId)
      return (
        <>
          <Typography>{"Incorrect game ID."}</Typography>
        </>
      );

    // <Grid item>
    //   <Card card={{ name: "zzz" }} preview />
    //   <TextField multiline rows={10} variant="outlined"></TextField>
    // </Grid>

    return (
      <>
        <Typography>{`Logged as ${username}. Players: ${players[me]} ${
          players[opp] ? `, ${players[opp]}` : ""
        }`}</Typography>
        <Typography>{``}</Typography>
        <Grid container>
          <Board />
        </Grid>
        <Hand />
      </>
    );
  }
}

export default defaultExporter(DraftRoom);
