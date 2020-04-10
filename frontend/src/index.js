import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { Auth0Provider } from "./contexts/react-auth0-spa";
import config from "./utils/auth0_config.json";
import history from "./utils/history";

import HomePage from './components/HomePage.js';
import DonatePage from './components/DonatePage.js';
import ReceivePage from './components/ReceivePage.js';
import AboutPage from './components/AboutPage.js';
import Footer from './components/Footer.js';

import RecipientPortal from './components/RecipientPortal.js';
import NavBar from './shared/NavBar.js';

function App () {

  return (
    <Router>

      <NavBar />

      <Switch>
        <Route exact path="/">
          <HomePage />
          <Footer />

        </Route>
        <Route path="/donate">
          <DonatePage />
          <Footer />

        </Route>
        <Route path="/receive">
          <ReceivePage />
          <Footer />

        </Route>
        <Route path="/recipient_portal">
          <RecipientPortal />
          <Footer />

        </Route>
        <Route path="/about_us">
          <AboutPage />
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};


ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
