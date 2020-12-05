import React, {useState} from 'react'
import styles from '../Card.module.sass'

const Property = props => {
  const {
    property,
    value,
    isEditing,
    onEditClick,
    onCancelClick,
    onOkClick
  } = props

  const [inputValue, setInputValue] = useState(value)

  return (
    <div className={styles.property}>
      <strong>{property}:</strong>
      {
        isEditing
          ? <div className={styles.property_edit}>
              <input
                className={styles.property_edit_input}
                type="text"
                autoFocus
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
              />
              <button onClick={onCancelClick}>Отмена</button>
              <button onClick={() => onOkClick(inputValue)}>ОК</button>
            </div>
          : <span
            className={styles.property_value}
            onClick={onEditClick}
          >{value}</span>
      }
    </div>
  )
}

export default Property