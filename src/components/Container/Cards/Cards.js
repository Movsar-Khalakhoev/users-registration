import React from 'react'
import styles from './Cards.module.sass'
import Card from './Card/Card'
import {connect} from 'react-redux'
import {deleteUser} from '../../../redux/actions/users'

const Cards = ({users, properties, deleteUser}) => {
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
        { users.map((user, index) =>
          <Card
            key={user.createDate}
            cardIndex={index}
            user={user}
            properties={properties}
            onClick={() => deleteUser(index)}
          />)
        }
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    users: state.users.usersList,
    properties: state.users.properties
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteUser: index => dispatch(deleteUser(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)