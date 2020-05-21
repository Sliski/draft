import React, { Component } from "react";
import { defaultExporter } from "../io/reducer";
import { chooseCard } from "../io/socket";
import { Button, Paper, Grid } from "@material-ui/core";
import Card from "./Card";

class Hand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCard: null,
      previousSelectedCard: null
    };
  }

  handleCardClick = i => {
    const { choices, me } = this.props;
    if (choices[me] !== null) return;
    this.setState(prevState => ({
      selectedCard: prevState.selectedCard === i ? null : i
    }));
  };

  handleButtonClick = () => {
    const { selectedCard } = this.state;
    const { choices, me } = this.props;

    if (selectedCard === null || choices[me] !== null) return;

    chooseCard(selectedCard);
    this.setState({ selectedCard: null });
  };

  render() {
    const { classes, hands, choices, me } = this.props;
    const { selectedCard } = this.state;

    const cardsInHand = hands[me];

    const markedCard = choices[me] !== null ? choices[me] : selectedCard;

    return (
      <Paper className={classes.hand}>
        <Button
          className={classes.chooseButton}
          variant="contained"
          color="primary"
          fullWidth
          disabled={selectedCard === null || choices[me] !== null}
          onClick={this.handleButtonClick}
        >
          {choices[me] === null ? "Choose" : "Wait for opponent`s choice..."}
        </Button>
        <Grid container>
          {cardsInHand && cardsInHand.length
            ? cardsInHand.map((card, i) => (
                <div
                  key={`card-in-hand-${i}`}
                  onClick={() => this.handleCardClick(i)}
                >
                  <Card
                    card={card}
                    row="hand"
                    col={i}
                    selected={markedCard === i}
                  />
                </div>
              ))
            : null}
        </Grid>
      </Paper>
    );
  }
}

export default defaultExporter(Hand);
