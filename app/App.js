import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { trackPageview } from './utils/analytics';
import { windowHas } from './utils/helpers';
import reducers from './utils/reducers';
import routes from './config/routes';

// Load static assets
import './images/static';

const initialState = windowHas('INITIAL_STATE') ? window.INITIAL_STATE : {};
const devToolsExtension = windowHas('devToolsExtension') ? window.devToolsExtension() : f => f;
const middleware = routerMiddleware(browserHistory);
const store = createStore(reducers, initialState, compose(applyMiddleware(middleware), devToolsExtension));
const history = syncHistoryWithStore(browserHistory, store);
history.listen(trackPageview);

const scrollToTop = () => {
  window.scrollTo(0, window.innerHeight);
  setTimeout(() => window.scrollTo(0, 0));
};

const renderDOM = () => {
  render(
    <Provider store={store}>
      <Router history={history} onUpdate={scrollToTop}>{routes}</Router>
    </Provider>,
    document.getElementById('sitewrap')
  );
};

document.addEventListener('DOMContentLoaded', renderDOM);

document.addEventListener('load', () => {
  windowHas('location') && trackPageview(window.location);
});
