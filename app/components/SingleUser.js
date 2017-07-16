import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

function SingleUser(props) {
              console.log(props.campus)
  return (

    <div>
      {
        props.user &&
        <div>
          <h2>Here's the student's information</h2>
          <h3>Student ID: {props.user.id}</h3>
          <h3>Name: {props.user.name}</h3>
          <h3>email: {props.user.email}</h3>
          <h3>Campus:
          <NavLink to={

            `/campus/${props.campus.id}`}>{props.campus && props.campus.name}</NavLink>
          </h3>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const user = _.find(state.students, (theStudent) => {
    return theStudent.id === +ownProps.match.params.id
  });
  const campus = _.find(state.campuses, (campus) => {
    console.log(state.students)
    return campus.id === user.campusId
  });
  return {
    user, campus
  };
};

export default connect(mapStateToProps)(SingleUser);

/*
{
      props.user ? (
        <div>
          <h2>just some JSX</h2>
        </div>
      ) : null
    }
*/
