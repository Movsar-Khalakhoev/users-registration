import React from 'react'
import styles from './Hamburger.module.sass'

const Hamburger = props => {
  const {
    wrapperClassName = '',
    text = '',
    textClassName = '',
    isActive,
    onClick
  } = props
  return (
    <div className={wrapperClassName} onClick={onClick}>
      <div className={`${styles.hamburger} ${isActive ? styles.hamburger_active : ''}`}>
        <span className={styles.line_1} />
        <span className={styles.line_2} />
        <span className={styles.line_3} />
      </div>
      <p className={textClassName}>{text}</p>
    </div>
  )
}

export default Hamburger