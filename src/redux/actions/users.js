import {UPDATE_PROPERTY} from './actionTypes'

export default function updateProperty(index, property, value) {
  return {
    type: UPDATE_PROPERTY,
    index, property, value
  }
}