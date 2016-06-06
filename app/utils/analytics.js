/* global window */
import { windowHas } from './helpers';

if (windowHas()) {
  window.dataLayer = window.dataLayer || [];
}

let path;
const trackPageview = ({ pathname }) => {
  if (path !== pathname) {
    path = pathname;
    window.dataLayer.push({
      event: 'pageview',
      virtualURL: path
    });
  }
};

const trackEvent = (eventCategory, eventAction, eventLabel, eventValue, eventCallback) => {
  window.dataLayer.push({
    event: 'customEvent',
    eventCategory,
    eventAction,
    eventLabel,
    eventValue,
    eventCallback
  });
  if (eventCallback) {
    setTimeout(eventCallback, 1500);
  }
};

export {
  trackPageview,
  trackEvent
};
