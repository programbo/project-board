import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Link } from '../Project';
import { filteredProjects } from '../Project/helpers';

const mapStateToProps = ({ projects, search }) => ({
  projects,
  search
});

const Home = ({ projects, search }) => (
  <div className="home">
    <h1>Meerkats Projects</h1>
    <div className="projects row">
      {filteredProjects(projects, search).map((project, index) => <Link project={project} key={index}/>)}
    </div>
  </div>
);

Home.propTypes = {
  projects: PropTypes.array.isRequired,
  search: PropTypes.string
};

export default connect(
  mapStateToProps
)(Home);
