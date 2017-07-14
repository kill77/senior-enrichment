import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewStudent } from '../store';

class addNewStudent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.handleSubmit(evt.target.name.value, evt.target.email.value, evt.target.campusId.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter New Student Name </label>
          <input
            name="name"
            type="text"
            required
          />
          <label>Enter Email</label>
          <input
            name="email"
            type="text"
            required
          />
          <label>Enter campus Id</label>
          <input
            name="campusId"
            type="text"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleSubmit: (name, email, campusId) => {
    dispatch(postNewStudent(name, email, campusId));
  }
});

export default connect(null, mapDispatchToProps)(addNewStudent);
