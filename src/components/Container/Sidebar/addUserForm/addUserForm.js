import React, {useState} from 'react'
import styles from './addUserForm.module.sass'
import {connect} from 'react-redux'
import {addUser} from '../../../../redux/actions/users'
import Input from './Input/Input'
import Select from 'react-select'

const AddUserForm = props => {
  const {
    properties,
    systemProperties,
    selectProperties,
    closeForm,
    addNewUser
  } = props

  const [values, setValues] = useState({})
  const [isCorrect, setIsCorrect] = useState({})
  const [userAdded, setUserAdded] = useState(false)
  const [isDangerInsc, setIsDangerInsc] = useState(false)

  function addUser() {
    let isReady = true
    Object.keys(properties).forEach(prop => {
      if (!systemProperties.includes(prop) && !isCorrect[prop]) {
        isReady = false
        setIsDangerInsc(true)
      }
    })

    if (!isReady) return
    const updatedValues = {...values}
    systemProperties.forEach(prop => {
      switch (prop) {
        case 'createDate':
          updatedValues.createDate = new Date().getTime()
          break
        case 'changeDate':
          updatedValues.changeDate = new Date().getTime()
          break
        default: return
      }
    })
    addNewUser(updatedValues)
    setUserAdded(true)
    setIsDangerInsc(false)
  }

  function changeSelectProperty(value, property) {
    setIsCorrect({...isCorrect, [property]: !!value})
    setValues({...values, [property]: value})
  }

  function changeIsCorrect(prop, bool) {
    setIsCorrect({...isCorrect, [prop]: bool})
  }

  return (
    <div className={styles.form}>
      <div>
        {
          Object.keys(properties).map((property, index) =>
            !systemProperties.includes(property)
              ? !selectProperties[property]
                  ? <Input
                      key={property}
                      propertyValue={property}
                      propertyLabel={properties[property]}
                      values={values}
                      setValues={setValues}
                      setIsCorrect={bool => changeIsCorrect(property, bool)}
                      userAdded={userAdded}
                      setUserAdded={setUserAdded}
                    />
                  : <Select
                      key={property}
                      options={selectProperties[property]}
                      onChange={action => changeSelectProperty(action.value, property)}
                    />
              : null
          )
        }
      </div>
      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={closeForm}>Отмена</button>
        <button onClick={addUser}>Сохранить</button>
      </div>
      {
        isDangerInsc
          ? <p className='error'>Введите корректные данные</p>
          : null
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    properties: state.users.properties,
    systemProperties: state.users.systemProperties,
    selectProperties: state.users.selectProperties
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewUser: user => dispatch(addUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm)