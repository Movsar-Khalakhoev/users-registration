import React from 'react'
import styles from './Filters.module.sass'

const Filters = () => {
  return (
    <div className={styles.filters}>
      {/*// TODO: React-select*/}
      <div className={styles.filters__active}>
        <div className={styles.property}>
          <label htmlFor="property-1" className={styles.property_label}>Свойство1:</label>
          <input className={styles.property_input} id="property-1" type="text" placeholder="Свойство1"/>
        </div>
      </div>
    </div>
  )
}

export default Filters