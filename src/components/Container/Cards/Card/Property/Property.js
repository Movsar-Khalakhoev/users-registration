import React, {useState} from 'react'
import styles from '../Card.module.sass'
import {connect} from 'react-redux'
import {updatePropertyAction} from '../../../../../redux/actions/users'
import InputMask from 'react-input-mask'
import is from 'is_js'
import Select from 'react-select'

const Property = props => {
  const {
    propertyValue,
    propertyLabel,
    cardIndex,
    propertyIndex,
    setIsEditing,
    isEditing,
    value,
    updateProperty,
    systemProperties,
    selectProperties,
    masks,
    messages
  } = props

  const [inputValue, setInputValue] = useState(value)
  const [error, setError] = useState(false)

  function changeValue(condition) {
    if (condition) {
      setError(true)
    } else {
      setError(false)
      setIsEditing(null)
      updateProperty(cardIndex, propertyValue, inputValue)
    }
  }

  function changeInputValue() {
    if (value === inputValue) {
      changeValue(false)
      return
    }

    switch (propertyValue) {
      case 'email':
        changeValue(!is.email(inputValue))
        break
      case 'password':
        changeValue(inputValue.length < 6)
        break
      case 'phone':
        changeValue(inputValue.replace(/\D+/g,'').length < 11)
        break
      default: changeValue(false)
    }
  }

  function resetInputValue() {
    setInputValue(value)
    setIsEditing(null)
  }

  function checkEdit(value) {
    if (!systemProperties.includes(value)) {
      setIsEditing(propertyIndex)
    }
  }

  return (
    <div className={styles.property}>
      <strong>{propertyLabel}:</strong>
      {
        isEditing
          ? <div className={styles.property_edit}>
              {
                !selectProperties[propertyValue]
                  ? <InputMask
                      className={styles.property_edit_input}
                      type="text"
                      mask={ masks[propertyValue] ? masks[propertyValue] : null}
                      autoFocus
                      value={inputValue}
                      onChange={event => setInputValue(event.target.value)}
                    />
                  : <Select
                      className={styles.select}
                      defaultValue={selectProperties[propertyValue].find(el => el.value === inputValue)}
                      options={selectProperties[propertyValue]}
                      onChange={action => setInputValue(action.value)}
                    />
              }
              <button onClick={resetInputValue}>Отмена</button>
              <button onClick={changeInputValue}>ОК</button>
              {
                error
                  ? <p className='error'>{messages[propertyValue]}</p>
                  : null
              }
            </div>
          : <span
            className={styles.property_value}
            onClick={() => checkEdit(propertyValue)}
          >{
            systemProperties.includes(propertyValue)
              ? new Date(value).toLocaleString()
              : !selectProperties[propertyValue]
                  ? value
                  : selectProperties[propertyValue].find(el => el.value === value).label
            }
          </span>
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    systemProperties: state.users.systemProperties,
    selectProperties: state.users.selectProperties,
    masks: state.users.masks,
    messages: state.users.messages
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateProperty: (index, property, value) => dispatch(updatePropertyAction(index, property, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Property)