import React, {Component} from 'react';
import SetTitle from "../../assets/js/setTitle.jsx";

export default (loadComponent, placeholder = "加载中...") => {
    return class AsyncComponent extends Component{
        constructor(props) {
            super(props);
            this.state={ Child: null };
            this.unmount = false
        }
        componentWillUnmount() {
            this.unmount = true;
        }
        async componentDidMount() {
            const title = SetTitle();
            document.title = title;
            const { default: Child } = await loadComponent();
            if(this.unmount) return;
            this.setState({Child})
        }
        render() {
            const { Child } = this.state;
            return ( Child ? <Child {...this.props} /> : placeholder )
        }

    }
}
