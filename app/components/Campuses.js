import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteCampus } from '../store';

function Campuses(props) {

  return (
    <div>
      <ul>
        {
          props.campuses && props.campuses.map(campus => {
            return (
              <li key={campus.id}>
                <NavLink to={`/campus/${campus.id}`}>
                  Campus: {campus.name}
                </NavLink>
                <button type="submit" onClick={props.handleDelete(campus.id)}>Delete</button>
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

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (campusId) => {
    console.log('from within dispatch');
    dispatch(deleteCampus(campusId));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
