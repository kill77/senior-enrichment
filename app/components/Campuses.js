import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Campuses(props) {
  return (
    <div>
      <ul>
        {
          props.campuses && props.campuses.map(campus =>{
            return (
              <li key={campus.id}>
                <NavLink to={`/campus/${campus.id}`}>
                  Campus: {campus.name}
                </NavLink>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = function (state) {
  return {
    campuses: state.campuses
  }
}

export default connect(mapStateToProps)(Campuses);
