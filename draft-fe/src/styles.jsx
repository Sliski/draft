const styles = theme => ({
  // scrollbar
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "1px solid slategrey"
    },
    background: "gray"
  },
  // App
  paperWithPadding: {
    padding: theme.spacing(2),
    width: "95%",
    // maxWidth: "680px",
    minWidth: "340px",
    backgroundColor: theme.palette.background.paper
  },
  card: {
    width: "125px",
    height: "175px",
    margin: "2px",
    "&:hover": {
      border: "solid black 2px",
      margin: 0
    }
  },
  selectedCard: {
    width: "125px",
    height: "175px",
    border: "solid red 2px",
    margin: 0
  },
  chooseButton: {
    marginBottom: theme.spacing(1)
  },
  highlightBg: {
    background: "lightyellow"
  },
  cardsCounter: {
    bottom: "40px",
    left: "90px"
  },
  tile: {
    width: "135px",
    height: "185px"
  },
  hand: {
    padding: theme.spacing(1),
    minHeight: "185px",
    background: "beige"
  },
  border: {
    border: "solid black 4px"
  },
  cardLayout: {
    padding: 0
  }
});

export default styles;
