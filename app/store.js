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
const DELETE_STUDENT = 'DELETE_STUDENT';
const CREATE_NEW_STUDENT = 'CREATE_NEW_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';
const EDIT_CAMPUS = 'EDIT_CAMPUS';

// ACTION CREATORS
export function deleteAStudent(student) {
  return {
    type: DELETE_STUDENT,
    student
  }
}

export function editACampus(campus) {
  return {
    type: EDIT_CAMPUS,
    campus
  }
}

export function getAllStudents(students) {
  return {
    type: GET_ALL_STUDENTS,
    students
  }
}

export function getAllCampuses(campuses) {
  return {
    type: GET_ALL_CAMPUSES,
    campuses
  }
}

export function createNewCampus (newCampus) {
  return {
    type: CREATE_NEW_CAMPUS,
    newCampus
  }
}

export function createNewStudent (newStudent) {
  return {
    type: CREATE_NEW_STUDENT,
    newStudent
  }
}

export function editAStudent (student) {
  return {
    type: EDIT_STUDENT,
    student
  }
}

export function deleteCampus(campusId) {
  return {
    type: DELETE_CAMPUS,
    campusId
  }
}

// THUNK CREATORS
export function fetchAllStudents() {
  return function thunk(dispatch) {
    return axios.get('/api/users')
      .then(res => res.data)
      .then(students => {
        dispatch(getAllStudents(students));
      });
  }
}

export function fetchAllCampuses() {
  return function thunk(dispatch) {
    return axios.get('/api/campus')
      .then(res => res.data)
      .then(campuses => {
        dispatch(getAllCampuses(campuses));
      });
  }
}

export function postNewCampus(name, image) {
  return function thunk(dispatch) {
    return axios.post('/api/campus', { name, image })
      .then(res => res.data)
      .then(newCampus => {
        dispatch(editACampus(newCampus));
      })
  }
}

export function postNewStudent(name, email, campusId) {
  return function thunk(dispatch) {
    return axios.post('/api/users', { name, email, campusId })
      .then(res => res.data)
      .then(newStudents => {
        dispatch(getAllStudents(newStudents));
      })
  }
}

export function editCampus(name, image, campusId) {
  return function thunk(dispatch) {
    return axios.put(`/api/campus/${campusId}`, { name, image })
      .then(res => res.data)
      .then(updatedCampuses => {
        console.log(updatedCampuses);
        dispatch(editACampus(updatedCampuses))
      })
  }
}

export function removeCampus(campusId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/campus/${campusId}`)
      .then(res => res.data)
      .then(deletedCampus => {
        dispatch(deleteCampus(deletedCampus));
      })
  }
}

export function editStudent(name, email, campusId, studentId) {
  return function thunk(dispatch) {
    return axios.put(`/api/users/${studentId}`, { name, email, campusId })
      .then(res => res.data)
      .then(updatedStudent => {
        dispatch(editAStudent(updatedStudent));
      })
  }
}

export function deleteStudent(studentId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/users/${studentId}`)
      .then(res => res.data)
      .then(deletedStudent => {
        dispatch(deleteAStudent(deletedStudent));
      })
  }
}

// REDUCERS
function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_STUDENT:
      const newStudentList = state.students.filter(students => {
        return students.id !== action.student
      })
      return Object.assign({}, state, { students: action.students });
    case EDIT_CAMPUS:
      return Object.assign({}, state, { campuses: action.campus });
    case GET_ALL_STUDENTS:
      return Object.assign({}, state, { students: action.students });
    case GET_ALL_CAMPUSES:
      return Object.assign({}, state, { campuses: action.campuses });
    case CREATE_NEW_CAMPUS:
      return Object.assign({}, state, { campuses: [...state.campuses, action.newCampus] });
    case EDIT_STUDENT:
      return Object.assign({}, state, { students: action.student});
    case DELETE_CAMPUS:
      const newCampusList = state.campuses.filter(campus => {
        return campus.id !== action.campusId
      })
      return Object.assign({}, state, { campuses: newCampusList });
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

// EDITING IS BROKEN. IT DOESN'T RELOAD UNTIL THE PAGE REFRESHES.
