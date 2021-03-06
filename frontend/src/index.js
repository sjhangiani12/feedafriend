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
import ReactGA from 'react-ga';

import HomePage from './components/HomePage.js';
import DonatePage from './components/DonatePage.js';
import FAQ from './components/FAQ.js';
import ReceivePage from './components/ReceivePage.js';
import AboutPage from './components/AboutPage.js';
import Footer from './components/Footer.js';
import NavBar from './shared/NavBar.js';
import ConfirmationPage from './components/ConfirmationPage.js';
import TC from "./static/TC.js";
import PP from "./static/PP.js";
import './style.css';

function initGoogleAnayltics() {
  ReactGA.initialize('UA-163953067-1');
  ReactGA.pageview("/");
  ReactGA.pageview("/donate");
  ReactGA.pageview("/receive");
  ReactGA.pageview("/about_us");
  ReactGA.pageview("/confirmation");
  ReactGA.pageview("/faq");
}

function App () {

  initGoogleAnayltics();

  return (
    <Router>

      <NavBar />

      <Switch>
        <Route exact path="/">
          <HomePage />
          <Footer isHome={true} />

        </Route>
        <Route path="/donate">
          <DonatePage />
          <div id="donationLandingPadding" />
          <Footer />

        </Route>
        <Route path="/receive">
          <ReceivePage />
          <Footer />

        </Route>
        <Route path="/about_us">
          <AboutPage />
          <Footer />

        </Route>
        <Route path="/confirmation">
          <ConfirmationPage />
          <Footer />

        </Route>
        <Route path="/faq">
          <FAQ />
          <Footer />

        </Route>
        <Route path="/terms">
          <TC />
          <Footer />

        </Route>
        <Route path="/privacy">
          <PP />
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
