import React from 'react'
import styles from './Container.module.sass'
import Sidebar from './Sidebar/Sidebar'
import Cards from './Cards/Cards'

const Container = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Cards />
    </div>
  )
}

export default Container