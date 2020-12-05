import {UPDATE_PROPERTY} from '../actions/actionTypes'

const initialState = {
  usersList: [
    {
      email: 'example@mail.ru',
      password: 'password',
      phone: '+77777777777',
      name: 'Иванов Иван Иванович',
      status: 'client',
      create_date: 123,
      change_date: 34234234
    },
    {
      email: 'example@mail.ru',
      password: 'password',
      phone: '+77777777777',
      name: 'Иванов Иван Иванович',
      status: 'client',
      create_date: 34234234,
      change_date: 34234234
    },
    {
      email: 'example@mail.ru',
      password: 'password',
      phone: '+77777777777',
      name: 'Иванов Иван Иванович',
      status: 'client',
      create_date: 34234234,
      change_date: 34234234
    }
  ],
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
  switch (action.type) {
    case UPDATE_PROPERTY:
      const usersList = [...state.usersList]
      usersList[action.index] = {
        ...usersList[action.index],
        [action.property]: action.value
      }

      return {
        ...state,
        usersList
      }
    default:
      return state
  }
}