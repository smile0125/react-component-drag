import React, { Component } from "react";
import ParentDom from "./index.jsx";
import TestDialog from "./testComponent.jsx";
class ChildDom extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ParentDom>
        <h1>这是在子组件添加的标签</h1>
        <TestDialog />
      </ParentDom>
    );
  }
}
export default ChildDom;
