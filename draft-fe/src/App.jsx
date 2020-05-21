import React, { Component } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { defaultExporter } from "./io/reducer";
import { chooseUsername } from "./io/socket";
import ChooseUsername from "./ChooseUsername";
import DraftRoom from "./room/DraftRoom";
import GamesList from "./lobby/GamesList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lsUsername: localStorage.getItem("username")
    };
  }

  componentDidMount() {
    const { lsUsername } = this.state;
    if (lsUsername) chooseUsername(lsUsername);
  }

  room = props => {
    return <DraftRoom urlGameId={props.match.params.urlGameId} />;
  };

  lobby = props => {
    return <GamesList />;
  };

  render() {
    const { username, error, gameId } = this.props;
    const { lsUsername } = this.state;
    //choose username or collect it from LS
    if (!username && lsUsername && !error) return null;
    if (!username) return <ChooseUsername />;

    let redirect = null;
    if (gameId) redirect = <Redirect to={`/game/${gameId}`} />;

    return (
      <DndProvider backend={Backend}>
        <Router>
          {redirect}
          <Switch>
            <Route path="/game/:urlGameId" component={this.room} />
            <Route component={this.lobby} />
          </Switch>
        </Router>
      </DndProvider>
    );
  }
}

export default defaultExporter(App);
