import React, { PropTypes } from 'react';

const SiteFooter = ({ children }) => (
  <footer className="site-footer">
    <div className="site-footer-content container-fluid">
      <div className="row">{children}</div>
    </div>
  </footer>
);

SiteFooter.propTypes = {
  children: PropTypes.any
};

export default SiteFooter;
