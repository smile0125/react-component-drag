import React, { Component } from 'react';
import { Toast } from 'react-weui';

export default class Loading extends Component {
    render() {
        const show = this.props.show;
        const loadingText = this.props.loadingText;
        return (
            <div>
                <Toast icon="loading" show={show} className='upload_loading'>{loadingText?loadingText:null}</Toast>
            </div>
        )
    }
}
