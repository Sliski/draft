import React, { Component } from "react";
import { DragSource } from "react-dnd";
import { defaultExporter } from "../io/reducer";
import { Paper } from "@material-ui/core";
import CardLayout from "../game/CardLayout";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes, card, connectDragSource, selected } = this.props;
    return connectDragSource(
      <div>
        <Paper className={selected ? classes.selectedCard : classes.card}>
          <CardLayout id={card.id} />
        </Paper>
      </div>
    );
  }
}

const cardSource = {
  beginDrag(props) {
    return {
      row: props.row,
      col: props.col,
      cardId: props.card.id
    };
  },
  canDrag(props, monitor) {
    return props.row !== "hand";
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default defaultExporter(DragSource("CARD", cardSource, collect)(Card));
