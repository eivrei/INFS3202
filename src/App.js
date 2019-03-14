import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './styles/base.scss';
import Landingpage from './components/Landingpage';
import Layout from './components/Layout';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import NoMatch from './components/NoMatch';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Landingpage} />
          <Route path="/login" exact component={LoginContainer} />
          <Route path="/register" exact component={RegisterContainer} />
          <Route component={NoMatch} />
        </Switch>
      </Layout>
    </Router>
  </React.Fragment>
);

export default App;
