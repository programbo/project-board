import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { push } from 'react-router-redux';

import { Header, Footer, Team } from '../Project';
import { filteredProjects } from '../Project/helpers';
import { simpleSlug } from '../../utils/helpers';
import { setSearchTerm, showSearchField } from '../../utils/actions';

const mapStateToProps = ({ projects, search }) => ({
  projects,
  search
});

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.getPreviousProject = this.getPreviousProject.bind(this);
    this.getNextProject = this.getNextProject.bind(this);
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
    this.renderNavigationLinks = this.renderNavigationLinks.bind(this);
  }
  componentDidMount() {
    const { dispatch, projects } = this.props;
    $(document).off('keydown').on('keydown', (e) => {
      switch (e.which) {
      case 37:
        dispatch(push(this.getPreviousProject(projects, this.project).path));
        break;
      case 39:
        dispatch(push(this.getNextProject(projects, this.project).path));
        break;
      default:
        return;
      }
      e.preventDefault();
    });
  }

  getProject(projects, brand, name) {
    return projects.find((item) => (simpleSlug(item.brand) === brand && simpleSlug(item.name) === name));
  }

  getProjectIndex(projects, project) {
    return projects.indexOf(project);
  }

  getPreviousProject(projects, project) {
    return projects[(this.getProjectIndex(projects, project) - 1 + projects.length) % projects.length];
  }

  getNextProject(projects, project) {
    return projects[(this.getProjectIndex(projects, project) + 1) % projects.length];
  }

  handleSearchTerm(searchTerm) {
    const { dispatch } = this.props;
    dispatch(setSearchTerm(searchTerm));
    dispatch(showSearchField());
    dispatch(push('/'));
  }

  renderNavigationLinks(projects) {
    return (
      <div className="navigation-links">
        <Link className="project-nav project-nav-previous" to={this.getPreviousProject(projects, this.project).path}><span className="glyphicon glyphicon-chevron-left"/></Link>
        <Link className="project-nav project-nav-next" to={this.getNextProject(projects, this.project).path}><span className="glyphicon glyphicon-chevron-right"/></Link>
      </div>
    );
  }

  render() {
    const { projects: allProjects, search, params: { brand, name } } = this.props;
    const projects = filteredProjects(allProjects, search);
    this.project = this.getProject(projects, brand, name);
    return (
      <div className="project">
        <IndexLink to="/" className="home-link"><span className="glyphicon glyphicon-th"/></IndexLink>
        <Header labeled project={this.project} onClickClient={this.handleSearchTerm}/>
        <Team project={this.project} labeled onClickName={this.handleSearchTerm}/>
        {projects.length > 1 && this.renderNavigationLinks(projects)}
        <Footer labeled project={this.project}/>
      </div>
    );
  }
}

Project.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  search: PropTypes.string
};

export default connect(mapStateToProps)(Project);
