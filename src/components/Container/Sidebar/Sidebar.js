import React from 'react'
import styles from './Sidebar.module.sass'
import Filters from './Filters/Filters'
import AddUserForm from './addUserForm/addUserForm'
import {connect} from 'react-redux'

const Sidebar = (props) => {
  console.log(props)
  return (
    <div className={styles.sidebar}>
      <span className={styles.add_user_btn}/>
      <Filters />
      <AddUserForm />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(Sidebar)