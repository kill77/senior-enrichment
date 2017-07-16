import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { deleteStudent } from '../store';

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
                <button>
                  <Link to={`/editStudent/${student.id}`}>Edit</Link>
                </button>
                <button type="submit" onClick={() => props.handleDelete(student.id)}>Delete</button>
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

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (studentId) => {
    dispatch(deleteStudent(studentId));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Users);
