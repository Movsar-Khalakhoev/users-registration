import React from 'react'
import styles from './Cards.module.sass'
import Card from './Card/Card'
import {connect} from 'react-redux'

const Cards = ({users, properties}) => {
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
            key={index}
            cardIndex={index}
            user={user}
            properties={properties}
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

export default connect(mapStateToProps)(Cards)