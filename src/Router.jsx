import React, {Component} from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import RouterList from './routerList.jsx';
class Router extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        {
                            RouterList.map(({ name, path, component, exact = true }) => {
                                return ( <Route exact={exact} path={path} component={component} key={name} /> )
                            })
                        }
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default Router;