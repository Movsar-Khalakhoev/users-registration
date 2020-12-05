import {ADD_USER, DELETE_USER, UPDATE_PROPERTY, UPDATE_USERS_LIST} from '../actions/actionTypes'

const initialState = {
  usersList: JSON.parse(localStorage.getItem('usersList')) || [],
  properties: {
    email: 'Электронный адрес',
    password: 'Пароль',
    phone: 'Телефон',
    name: 'ФИО',
    status: 'Статус пользователя',
    create_date: 'Дата создания',
    change_date: 'Дата последнего изменения'
  }
}

export default function usersReducer(state = initialState, action) {
  let usersList
  switch (action.type) {
    case UPDATE_PROPERTY:
      usersList = [...state.usersList]
      usersList[action.index] = {
        ...usersList[action.index],
        [action.property]: action.value
      }
      return {
        ...state,
        usersList
      }
    case UPDATE_USERS_LIST:
      const filteredUsersList = []
      const allUsers = localStorage.getItem('usersList')
      if (!allUsers) return state
      allUsers.forEach(user => {
        let isReady = false
        Object.keys(action.filters).forEach(filter => {
          if (user[filter] && user[filter].startsWith(action.filters[filter])) {
            isReady = true
          }
        })
        if (isReady) {
          filteredUsersList.push(user)
        }
      })
      return {
        ...state,
        usersList: filteredUsersList
      }
    case ADD_USER:
      usersList = [...state.usersList]
      usersList.push(action.user)
      console.log(usersList)
      localStorage.setItem('usersList', JSON.stringify(usersList))
      return {
        ...state,
        usersList
      }
    case DELETE_USER:
      usersList = [...state.usersList]
      usersList.splice(action.index, 1)
      localStorage.setItem('usersList', JSON.stringify(usersList))
      console.log('deleted')
      return {
        ...state,
        usersList
      }
    default:
      return state
  }
}