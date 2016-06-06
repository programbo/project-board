import React, { PropTypes } from 'react';
import NotFound from '../Pages/NotFound';

function renderChildren(children, pageData) {
  if (pageData.status === 404) {
    return (<NotFound/>);
  }
  return React.cloneElement(children, { pageData });
}

const SiteContent = ({ children, pageData }) => (
  <div className="site-content-wrapper">
    <div className="site-content">{renderChildren(children, pageData)}</div>
  </div>
);

SiteContent.propTypes = {
  children: PropTypes.any,
  pageData: PropTypes.object
};

export default SiteContent;
