import React,{Component} from 'react';
import { Route, Switch } from 'react-router'
import Login from './containers/login/login'
import Admin from './containers/admin/admin'


class App extends Component {
  render() {
    return (
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/admin' component={Admin} />
        </Switch>
    )
  }
}

export default App;
