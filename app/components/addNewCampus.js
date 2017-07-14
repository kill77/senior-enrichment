import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewCampus } from '../store';

class addNewCampus extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.handleSubmit(evt.target.name.value, evt.target.image.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter Campus Name </label>
          <input
            name="name"
            type="text"
            required
          />
          <label>Enter campus image location</label>
          <input
            name="image"
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
  handleSubmit: (name, image) => {
    dispatch(postNewCampus(name, image));
  }
});

export default connect(null, mapDispatchToProps)(addNewCampus);
