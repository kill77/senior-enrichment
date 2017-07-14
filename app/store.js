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
const CREATE_NEW_CAMPUS = 'CREATE_NEW_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

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

// export function createNewCampus (newCampus) {
//   return {
//     type: CREATE_NEW_CAMPUS,
//     newCampus
//   }
// }

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

export function postNewCampus (name, image) {
  return function thunk (dispatch) {
    return axios.post('/api/campus', {name, image})
      .then(res => res.data)
      .then(newCampus => {
        dispatch(getAllCampuses(newCampus));
      })
  }
}

export function postNewStudent (name, email, campusId) {
  return function thunk (dispatch) {
    return axios.post('/api/users', {name, email, campusId})
      .then(res => res.data)
      .then(newStudents => {
        dispatch(getAllStudents(newStudents));
      })
  }
}

export function deleteCampus (campusId) {
  return function thunk (dispatch) {
    return axios.delete(`/api/campus/${campusId}`)
      .then(res => res.data)
      .then(deletedCampus => {
        dispatch(getAllCampuses(deletedCampus));
      })
  }
}

// REDUCERS
function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_STUDENTS:
      return Object.assign({}, state, {students: action.students});
    case GET_ALL_CAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses});
    case CREATE_NEW_CAMPUS:
      return Object.assign({}, state, {campuses: action.campuses});
    case DELETE_CAMPUS:
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
