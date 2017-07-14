import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// INITIAL STATE
const initialState = {
  students: [],
  campuses: []
};

// ACTION TYPES
const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
const GET_ALL_CAMPUSES = 'GET_ALL_CAMPUSES';

// ACTION CREATORS
export function getAllStudents (students) {
  return {
    type: GET_ALL_STUDENTS,
    students
  }
}

export function getAllCampuses (campuses) {
  return {
    type: GET_ALL_CAMPUSES,
    campuses
  }
}

// THUNK CREATORS
export function fetchAllStudents () {
  return function thunk (dispatch) {
    return axios.get('/api/users')
      .then(res => res.data)
      .then(students => {
        dispatch(getAllStudents(students));
      });
  }
}

export function fetchAllCampuses () {
  return function thunk (dispatch) {
    return axios.get('/api/campus')
      .then(res => res.data)
      .then(campuses => {
        dispatch(getAllCampuses(campuses));
      });
  }
}

// REDUCERS
function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_STUDENTS:
      return Object.assign({}, state, {students: action.students});
    case GET_ALL_CAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses});
    default:
      return state;
  }
}

// CREATING AND EXPORTING THE STORE
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

export default store;
