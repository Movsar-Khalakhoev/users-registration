import React, {useState} from 'react'
import styles from './Sidebar.module.sass'
import Filters from './Filters/Filters'
import AddUserForm from './addUserForm/addUserForm'
import {connect} from 'react-redux'

const Sidebar = ({isActive}) => {
  const [component, setComponent] = useState('filters')
  return (
    <div className={`${styles.sidebar} ${isActive ? styles.sidebar_active : ''}`}>
      {
        component === 'filters'
          ? <>
              <span
                className={styles.add_user_btn}
                onClick={() => setComponent('add-user-form')}
              />
              <Filters />
            </>
          : <AddUserForm closeForm={() => setComponent('filters')}/>
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(Sidebar)