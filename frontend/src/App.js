import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './styles/base.scss';
import Landingpage from './components/Landingpage';
import Layout from './components/Layout';
import SignInContainer from './containers/SignInContainer';
import SignUpContainer from './containers/SignUpContainer';
import NoMatch from './components/NoMatch';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Landingpage} />
          <Route path="/sign-in" exact component={SignInContainer} />
          <Route path="/sign-up" exact component={SignUpContainer} />
          <Route component={NoMatch} />
        </Switch>
      </Layout>
    </Router>
  </React.Fragment>
);

export default App;
