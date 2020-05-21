import React, { Component } from "react";
import { defaultExporter } from "./io/reducer";
import { Paper } from "@material-ui/core";

class JsxTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <Paper></Paper>;
  }
}

export default defaultExporter(JsxTemplate);
