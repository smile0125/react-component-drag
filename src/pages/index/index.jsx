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
    const s = new Drag({ targets }, { isExcess: true, defaultZIndex: 1000 });
    s.start();
  }

  render() {
    return (
      <div
        className='drag-component'
        style={{
            position: "fixed",
            padding: "20px",
            background: '#ffffff',
            zIndex: 1000,
        }}
        ref={(dragDiv) => (this.dragDiv = dragDiv)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Index;
