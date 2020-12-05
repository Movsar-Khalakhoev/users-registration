import React, {useState} from 'react'
import styles from './addUserForm.module.sass'
import {connect} from 'react-redux'
import {addUser} from '../../../../redux/actions/users'

const AddUserForm = ({properties, closeForm, addNewUser}) => {
  const [values, setValues] = useState({})

  function addUser() {
    addNewUser(values)
    console.log(values)
  }
  return (
    <div className={styles.form}>
      <div>
        {
          Object.keys(properties).map((property, index) =>
            <div className={styles.property} key={index}>
              <label
                htmlFor="property-1"
                className={styles.property_label}
              >{properties[property]}:</label>
              <input
                className={styles.property_input}
                type="text"
                placeholder={properties[property]}
                onChange={event =>  setValues({...values, [property]: event.target.value})}
              />
            </div>
          )
        }
      </div>
      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={closeForm}>Отмена</button>
        <button onClick={addUser}>Сохранить</button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    properties: state.users.properties
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewUser: user => dispatch(addUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm)