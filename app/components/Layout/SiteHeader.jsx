import React, { PropTypes } from 'react';

const SiteHeader = ({ children }) => (
  <header className="site-header">
    <div className="site-header-content">
      {children}
    </div>
  </header>
);

SiteHeader.propTypes = {
  children: PropTypes.any
};

export default SiteHeader;
