import React, { PropTypes } from 'react';

import getPageData, { defaultPageData } from '../../data/data';
import { SiteHeader, SiteContent, SiteFooter } from '.';
import { updateMetadata } from '../../utils/helpers';

const Main = ({ children, location: { pathname } }) => {
  const pageData = getPageData(pathname) || defaultPageData;
  updateMetadata(pageData);

  return (
    <div className="main">
      <SiteHeader/>
      <SiteContent pageData={pageData}>{children}</SiteContent>
      <SiteFooter/>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  location: PropTypes.object
};

export default Main;
