import React, {useState} from 'react'
import styles from './Card.module.sass'
import Property from './Property/Property'

const Card = props => {
  const {
    user,
    properties,
    cardIndex,
    onClick
  } = props

  const [isEditing, setIsEditing] = useState(null)
  return (
    <div className={styles.card}>
      <div>
        { Object.keys(user).map((prop, index) =>
          <Property
            key={prop}
            propertyValue={prop}
            propertyLabel={properties[prop]}
            cardIndex={cardIndex}
            propertyIndex={index}
            setIsEditing={setIsEditing}
            isEditing={isEditing === index}
            value={user[prop]}
          />)
        }
      </div>
      <span
        className={styles.delete}
        title="Удалить"
        onClick={onClick}
      />
    </div>
  )
}

export default Card