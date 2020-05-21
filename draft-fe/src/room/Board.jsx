import React, { Component } from "react";
import { defaultExporter, ROWS, COLS } from "../io/reducer";
import { Grid } from "@material-ui/core";
import Tile from "./Tile";

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { me } = this.props;
    //flip table for player B
    const rowsView = me === "B" ? ROWS.slice().reverse() : ROWS;
    return (
      <Grid item>
        {rowsView.map(row => (
          <Grid key={`grid-row-${row}`} container item>
            {COLS.map(col => (
              <Tile key={`tile-${row}${col}`} row={row} col={col} />
            ))}
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default defaultExporter(Board);
