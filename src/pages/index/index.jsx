import React, { Component } from "react";
import Drag from "./drag.js";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const target = this.dragDiv;
    let targets = [target];
    const s = new Drag({ targets }, { isExcess: true, defaultZIndex: 600 });
    s.start();
  }

  render() {
    return (
      <div
        style={{ position: "absolute", padding: "20px" }}
        ref={(dragDiv) => (this.dragDiv = dragDiv)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Index;
