'use strict'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store';
import Main from './components/Main';
import { BrowserRouter as Router } from 'react-router-dom';

render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('main')
)

// Adding a campus works but adding a student doesn't.
// Deleting campus buttons aren't working properly...currently
// the button deletes all campuses in the database.
