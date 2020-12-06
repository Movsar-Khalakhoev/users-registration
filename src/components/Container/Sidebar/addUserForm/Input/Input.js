import React, {useEffect, useState} from 'react'
import styles from './Input.module.sass'
import is from 'is_js'
import InputMask from 'react-input-mask'
import {connect} from 'react-redux'

const Input = props => {
  const {
    propertyValue,
    propertyLabel,
    values,
    setValues,
    setIsCorrect,
    userAdded,
    setUserAdded,
    messages,
    masks,
  } = props
  const [error, setError] = useState(false)
  const [inputValue, setInputValue] = useState('')

  function changeValue(condition) {
    if (condition) {
      setError(true)
      setIsCorrect(false)
    } else {
      setError(false)
      setIsCorrect(true)
    }
  }

  function checkRight(event, property) {
    switch (property) {
      case 'email':
        changeValue(!is.email(event.target.value))
        break
      case 'password':
        changeValue(event.target.value.length < 6)
        break
      case 'phone':
        changeValue(event.target.value.replace(/\D+/g,'').length < 11)
        break
      default: changeValue(false)
    }
  }

  function changeInputValue(value) {
    setValues({...values, [propertyValue]: value})
    setInputValue(value)
  }

  useEffect(() => {
    setInputValue('')
    setUserAdded(false)
  }, [userAdded, setUserAdded])

  return (
    <div className={styles.property}>
      <label
        htmlFor="property-1"
        className={styles.property_label}
      >{propertyLabel}:</label>
      <InputMask
        className={styles.property_input}
        type="text"
        mask={masks[propertyValue] ? masks[propertyValue] : null}
        placeholder={propertyLabel}
        value={inputValue}
        onChange={event =>  changeInputValue(event.target.value)}
        onBlur={event => checkRight(event, propertyValue)}
      />
      {
        error
          ? <p className='error'>{messages[propertyValue]}</p>
          : null
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    messages: state.users.messages,
    masks: state.users.masks
  }
}

export default connect(mapStateToProps)(Input)