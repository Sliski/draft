import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { defaultExporter } from "../io/reducer";
import { moveCard } from "../io/socket";
import { Grid, Fab } from "@material-ui/core";
import Card from "./Card";

class Tile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes, row, col, table, connectDropTarget, isOver } = this.props;

    const cardsOnTile = table[`${row}${col}`];
    let topCard = null;
    if (cardsOnTile && cardsOnTile.length) {
      topCard = cardsOnTile[cardsOnTile.length - 1];
    }

    return connectDropTarget(
      <div className={classes.tile + " " + (isOver ? classes.highlightBg : "")}>
        <Grid item>
          {topCard && (
            <>
              <Card
                row={row}
                col={col}
                card={topCard}
                counter={cardsOnTile.length}
              />
              {cardsOnTile && cardsOnTile.length > 1 && (
                <Fab size="small" className={classes.cardsCounter}>
                  {cardsOnTile.length}
                </Fab>
              )}
            </>
          )}
        </Grid>
      </div>
    );
  }
}

const tileTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    if (!item || (item.row === props.row && item.col === props.col)) return;

    moveCard(item.cardId, `${item.row}${item.col}`, `${props.row}${props.col}`);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default defaultExporter(DropTarget("CARD", tileTarget, collect)(Tile));
