import React from 'react'
import styles from './Cards.module.sass'
import Card from './Card/Card'

const Cards = () => {
  return (
    <div className={styles.cards}>
      <div className={styles.show_filters}>
        <div className={styles.hamburger}>
          <span className={styles.line_1} />
          <span className={styles.line_2} />
          <span className={styles.line_3} />
        </div>
        <p className={styles.text}>Фильтры</p>
      </div>
      <div className={styles.list}>
        <Card />
      </div>
    </div>
  )
}

export default Cards