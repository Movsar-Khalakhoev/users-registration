import React from 'react'
import styles from './addUserForm.module.sass'

const AddUserForm = () => {
  return (
    <div className={styles.form}>
      <div>
        <div className={styles.property}>
          <label htmlFor="property-1" className={styles.property_label}>Свойство1:</label>
          <input className={styles.property_input} id="property-1" type="text" placeholder="Свойство1" />
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.cancel}>Отмена</button>
        <button>Сохранить</button>
      </div>
    </div>
  )
}

export default AddUserForm