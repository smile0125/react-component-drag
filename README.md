# react-component-drag
React components drag and drop
# Installing
npm i react-component-drag
# Example
```
import React, { Component } from "react";
import Drag from "react-component-drag";
class Test extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Drag>
        <h1>内容</h1>
      </Drag>
    );
  }
}
export default Test;

```