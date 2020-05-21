import React, { Component } from "react";
import { defaultExporter } from "./io/reducer";
import { Paper, TextField, Button } from "@material-ui/core";
import { chooseUsername } from "./io/socket";

class ChooseUsername extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUsername: ""
    };
  }

  handleButtonClick = () => {
    const { newUsername } = this.state;
    console.log(newUsername);
    chooseUsername(newUsername);
  };

  render() {
    const { classes } = this.props;
    const { newUsername } = this.state;
    return (
      <Paper className={classes.paperWithPadding}>
        <TextField
          required
          autoFocus
          label="Choose username"
          value={newUsername}
          onChange={e => this.setState({ newUsername: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleButtonClick}
        >
          {"OK"}
        </Button>
      </Paper>
    );
  }
}

export default defaultExporter(ChooseUsername);
