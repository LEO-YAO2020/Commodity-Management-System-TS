import React,{Component} from 'react';
import { Route, Switch } from 'react-router'
import Login from './page/login/login'
import Admin from './page/admin/admin'


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
