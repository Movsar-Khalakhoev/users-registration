import React from 'react'
import styles from './Sidebar.module.sass'
import Filters from './Filters/Filters'
import AddUserForm from './addUserForm/addUserForm'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <span className={styles.add_user_btn}/>
      <Filters />
      <AddUserForm />
    </div>
  )
}

export default Sidebar