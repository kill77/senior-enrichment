import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { editStudent } from '../store';

class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const name = evt.target.name.value;
    const email = evt.target.email.value;
    const campusId = evt.target.campusId.value;
    const studentId = +this.props.match.params.id;

    this.props.handleSubmit(name, email, campusId, studentId);
  }

  render() {
    return (
      <div>
        <h2>Edit Student below</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Change the Name</label>
          <input
            name="name"
            type="text"
            required
          />
          <label>Edit Email image</label>
          <input
            name="email"
            type="text"
            required
          />
          <label>Edit the Campus this student attends</label>
          <select name="campusId" required>
            {
              this.props.campus.map(campus => {
                return <option key={campus.id} value={campus.id}>{campus.name}</option>
              })
            }
          </select>
          <button type="submit">Submit Changes</button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    campus: state.campuses
  }
}

const mapDispatchToProps = dispatch => ({
  handleSubmit: (name, email, campusId, studentId) => {
    dispatch(editStudent(name, email, campusId, studentId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStudent);
