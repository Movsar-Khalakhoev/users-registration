import {ADD_USER, UPDATE_PROPERTY, UPDATE_USERS_LIST} from './actionTypes'

export function updateProperty(index, property, value) {
  return {
    type: UPDATE_PROPERTY,
    index, property, value
  }
}

export function updateUsersList(filters) {
  return {
    type: UPDATE_USERS_LIST,
    filters
  }
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  }
}