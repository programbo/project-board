import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Link } from '../Project';

const mapStateToProps = ({ projects }) => ({
  projects
});

const Home = ({ projects }) => (
  <div className="home">
    <h1>Meerkats Projects</h1>
    <div className="projects row">
      {projects.map((project, index) => <Link project={project} key={index}/>)}
    </div>
  </div>
);

Home.propTypes = {
  projects: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps
)(Home);
