import React, { Component } from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import Users from './Users';
import { fetchAllStudents, fetchAllCampuses } from '../store';
import SingleUser from './SingleUser';
import { connect } from 'react-redux';
import Campuses from './Campuses';
import SingleCampus from './SingleCampus';
import addNewCampus from './addNewCampus';
import addNewStudent from './addNewStudents.js';

class Main extends Component {

  componentDidMount() {
    this.props.fetchAllStudents();
    this.props.fetchAllCampuses();
  }

  render() {
    return (
      <div>
        <h1>Welcome to the best school ever</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/allStudents">See All Students</Link></li>
          <li><Link to="/allCampuses">See All Campuses</Link></li>
          <li><Link to="/addNewCampus">Add New Campus</Link></li>
          <li><Link to="/addStudent">Add New Student</Link></li>
        </ul>
        <Switch>
          <Route path="/allStudents" component={Users} />
          <Route path="/student/:id" component={SingleUser} />
          <Route path="/allCampuses" component={Campuses} />
          <Route path="/campus/:id" component={SingleCampus} />
          <Route path="/addNewCampus" component={addNewCampus} />
          <Route path="/addStudent" component={addNewStudent} />
          <Redirect to="/" />
        </Switch>
      </div>
    )
  }

  // onSearchSubmit (evt) {
  //   evt.preventDefault();
  //   <Link to={`/student/${evt.target.searchById.value}`}></Link>
  // }
}

const mapDispatchToProps = dispatch => ({
  fetchAllStudents: () => {
    dispatch(fetchAllStudents());
  },
  fetchAllCampuses: () => {
    dispatch(fetchAllCampuses());
  }
});

export default withRouter(connect(null, mapDispatchToProps)(Main));
