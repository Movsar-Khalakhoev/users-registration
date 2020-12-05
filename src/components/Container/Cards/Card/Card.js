import React from 'react'
import styles from './Card.module.sass'

const Card = () => {
  return (
    <div className={styles.card}>
      <div>
        <div className={styles.property}>
          Электронный адрес:
          {/*<span className={styles.property_value}>*/}
          {/*  Значение*/}
          {/*</span>*/}
          <div className={styles.property_edit}>
            <input className={styles.property_edit_input} type="text" />
            <button>Отмена</button>
            <button>ОК</button>
          </div>
        </div>
        <div className={styles.property}>Пароль:</div>
        <div className={styles.property}>Телефон:</div>
        <div className={styles.property}>ФИО:</div>
        <div className={styles.property}>Статус пользователя:</div>
        <div className={styles.property}>Дата создания:</div>
        <div className={styles.property}>Дата последнего изменения:</div>
      </div>
      <span className={styles.delete} title="Удалить" />
    </div>
  )
}

export default Card