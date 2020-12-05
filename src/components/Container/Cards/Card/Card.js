import React, {useState} from 'react'
import styles from './Card.module.sass'
import Property from './Property/Property'
import {connect} from 'react-redux'
import {updateProperty} from '../../../../redux/actions/users'

const Card = ({user, properties, cardIndex, updateProperty}) => {
  const [isEditing, setIsEditing] = useState(null)
  function addEditPropertyForm(index) {
    setIsEditing(index)
  }
  function changeInputValue(prevValue, newValue, property) {
    setIsEditing(null)
    if (prevValue === newValue) return
    updateProperty(cardIndex, property, newValue)
  }

  return (
    <div className={styles.card}>
      <div>
        { Object.keys(user).map((prop, index) =>
          <Property
            key={index}
            property={properties[prop]}
            value={user[prop]}
            isEditing={isEditing === index}
            onEditClick={() => addEditPropertyForm(index)}
            onCancelClick={() => setIsEditing(null)}
            onOkClick={value => changeInputValue(user[prop], value, prop)}
          />)
        }
      </div>
      <span className={styles.delete} title="Удалить" />
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    updateProperty: (index, property, value) => dispatch(updateProperty(index, property, value))
  }
}

export default connect(null, mapDispatchToProps)(Card)