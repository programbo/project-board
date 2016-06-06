import config from 'config';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import routes from '../app/config/routes';
import getPageData, { defaultPageData } from '../app/data/data';
import app from '../app/utils/reducers/index.js';

function getPageContent(renderProps, pagePath) {
  const store = createStore(app);
  const isDev = process.env.npm_lifecycle_event.match(/dev/);
  const pageData = getPageData(pagePath) || defaultPageData;

  return {
    ...pageData,
    canonicalUrl: `http://${config.get('site.hostname')}${pagePath}`,
    defaultSiteTitle: config.get('site.defaultSiteTitle'),
    fbAppId: config.get('site.fbAppId'),
    gtmId: config.get('site.gtmId'),
    initialState: store.getState(),
    reactHtml: isDev ? '' : renderToString(<Provider store={store}><RouterContext {...renderProps}/></Provider>),
    status: pageData.status || 200
  };
}

export default (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    else if (renderProps) {
      const pageContent = getPageContent(renderProps, req.path);
      res.status(pageContent.status).render('index', pageContent);
    }
    else {
      res.status(404).render('index', defaultPageData);
    }
  });
};
