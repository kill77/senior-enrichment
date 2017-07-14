import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Users(props) {

  return (
    <div>
      <ul>
        {
          props.students && props.students.map(student => {
            return (
              <li key={student.id}>
                <NavLink to={`/student/${student.id}`}>
                  NAME: {student.name}
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
    students: state.students,
  }
}

export default connect(mapStateToProps)(Users);
