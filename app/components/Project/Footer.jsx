import React, { PropTypes } from 'react';

const Footer = ({ project: { due } }) => (
  <footer className="project-footer">
    <h5>Due: {due}</h5>
  </footer>
);

Footer.propTypes = {
  project: PropTypes.object.isRequired
};

export default Footer;
