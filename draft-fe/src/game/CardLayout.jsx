import React, { Component } from "react";
import { defaultExporter } from "../io/reducer";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { CARDS } from "./cards.js";

class JsxTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes, id } = this.props;
    const { aim, dmg, def, arm, slot } = CARDS[id];

    return (
      <List dense className={classes.cardLayout} styles={{ paddingTop: 0 }}>
        <ListItem>
          <ListItemText>{`AIM: ${aim}`}</ListItemText>
        </ListItem>
        <ListItem divider>
          <ListItemText>{`DMG: ${dmg}`}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>{`DEF: ${def}`}</ListItemText>
        </ListItem>
        <ListItem divider>
          <ListItemText>{`ARM: ${arm}`}</ListItemText>
        </ListItem>
        <ListItem alignItems="center">
          <ListItemText>
            <strong>{slot}</strong>
          </ListItemText>
        </ListItem>
      </List>
    );
  }
}

export default defaultExporter(JsxTemplate);
