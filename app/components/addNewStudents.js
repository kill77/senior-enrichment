import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewStudent, fetchAllCampuses } from '../store';

class addNewStudent extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const name = evt.target.name.value;
    const email = evt.target.email.value;
    const campusId = evt.target.campusId.value;

    console.log('name: ', name);
    console.log('email', email);
    console.log('campusId', campusId);

    this.props.handleSubmit(name, email, campusId);
  }

  componentDidMount() {
    this.props.fetchAllCampuses();
  }

  render() {
    console.log('logging at addNewStudents props: ',this.props);
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
          <select name="campusId" required>
          {
            this.props.campus.map(campus => {
              return <option key={campus.id} value={campus.id}>{campus.name}</option>
            })
          }
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleSubmit: (name, email, campusId) => {
    dispatch(postNewStudent(name, email, campusId));
  },
  fetchAllCampuses: () => {
    dispatch(fetchAllCampuses());
  }
});

const mapStateToProps = (state) => {
  return {
    campus: state.campuses
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(addNewStudent);
