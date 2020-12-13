import React, { Component } from 'react';
import { Toptips } from 'react-weui';

export default class TopTip extends Component {
    render() {
        const show = this.props.show;
        return (
            <Toptips type={this.props.type} show={show}>
                {this.props.text}
            </Toptips>
        )
    }
}
