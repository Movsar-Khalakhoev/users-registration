import {ADD_USER, DELETE_USER, UPDATE_PROPERTY, UPDATE_USERS_LIST} from '../actions/actionTypes'
import is from 'is_js'

const initialState = {
  usersList: JSON.parse(localStorage.getItem('usersList')) || [],
  properties: {
    email: 'Электронный адрес',
    password: 'Пароль',
    phone: 'Телефон',
    name: 'ФИО',
    status: 'Статус пользователя',
    createDate: 'Дата создания',
    changeDate: 'Дата последнего изменения'
  },
  selectProperties: {
    status: [
      {value: 'client', label: 'Клиент'},
      {value: 'partner', label: 'Партнер'},
      {value: 'admin', label: 'Админ'}
    ]
  },
  systemProperties: ['createDate', 'changeDate'],
  messages: {
    email: 'Введите корректный email',
    password: 'Пароль должен быть не короче 6 символов',
    phone: 'Введите корректный номер телефона',
    name: 'Введите корректное ФИО'
  },
  masks: {
    phone: '+9 999 999 99 99'
  }
}

export default function usersReducer(state = initialState, action) {
  let usersList
  switch (action.type) {
    case UPDATE_PROPERTY:
      usersList = [...state.usersList]
      usersList[action.index] = {
        ...usersList[action.index],
        [action.property]: action.value,
        'changeDate': new Date().getTime()
      }
      localStorage.setItem('usersList', JSON.stringify(usersList))
      return {
        ...state,
        usersList
      }
    case UPDATE_USERS_LIST:
      let filteredUsersList = []
      const allUsers = JSON.parse(localStorage.getItem('usersList'))
      if (!allUsers) return state
      !is.empty(action.filters)

      ? allUsers.forEach(user => {
          let isReady = true

          Object.keys(action.filters).forEach(filter => {
            // debugger
            if (!user[filter] || !user[filter].startsWith(action.filters[filter])) {
              isReady = false
            }
          })
          if (isReady) {
            filteredUsersList.push({...user})
          }
        })
      : filteredUsersList = [...allUsers]
      return {
        ...state,
        usersList: filteredUsersList
      }
    case ADD_USER:
      usersList = [...state.usersList]
      usersList.push(action.user)
      localStorage.setItem('usersList', JSON.stringify(usersList))
      return {
        ...state,
        usersList
      }
    case DELETE_USER:
      usersList = [...state.usersList]
      usersList.splice(action.index, 1)
      localStorage.setItem('usersList', JSON.stringify(usersList))
      return {
        ...state,
        usersList
      }
    default:
      return state
  }
}