import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

function SingleCampus(props) {
  console.log(props.campus && props.campus.users)

  return (
    <div>
      {
        props.campus &&
        <div>
          <h2>Check out this campus!</h2>
          <h2>Campus: {props.campus.name}</h2>
          <h2>Students enrolled:
          <ul>
              {
                props.campus.users.map(userObj => {
                  return <li key={userObj.id}><NavLink to={`/student/${userObj.id}`}>{userObj.name}</NavLink></li>
                })
              }
            </ul>
          </h2>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const campus = _.find(state.campuses, (theCampus) => {
    return theCampus.id === +ownProps.match.params.id
  })
  return {
    campus
  };
};

export default connect(mapStateToProps)(SingleCampus);
