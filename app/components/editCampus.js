import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { editCampus } from '../store';

// campus id can be accessed from props.match.params.id

class EditCampus extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const theCampusID = +this.props.match.params.id;
    this.props.handleSubmit(evt.target.name.value, evt.target.image.value, theCampusID);
  }

  render() {
    return (
      <div>
        <h2>Edit Campus below</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Change the Name</label>
          <input
            name="name"
            type="text"
            required
          />
          <label>Edit campus image</label>
          <input
            name="image"
            type="text"
            required
          />
          <button type="submit">Submit Changes</button>
        </form>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  handleSubmit: (name, image, campusId) => {
    dispatch(editCampus(name, image, campusId));
  }
});

export default connect(null, mapDispatchToProps)(EditCampus);
