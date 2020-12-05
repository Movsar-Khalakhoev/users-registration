import React, {useEffect, useState} from 'react'
import styles from './Filters.module.sass'
import Select from 'react-select'
import {connect} from 'react-redux'
import {updateUsersList} from '../../../../redux/actions/users'

const options = properties => {
  let options =  new Array(Object.keys(properties).length).fill('')
    Object.keys(properties).map((property, index) => {
      options[index] = {value: property, label: properties[property]}
    })

  return options
}

const Filters = ({properties, getFilteredUsers}) => {
  const [filters, setFilters] = useState({})
  let timeout

  function updateFiltersList(newFilters, event) {
    const activeFilters = {...filters}
    if (event.action === 'remove-value') {
      delete activeFilters[event.removedValue.value]
    } else if(newFilters) {
      newFilters.forEach(filter => {
        if (!activeFilters[filter.value]) {
          activeFilters[filter.value] = ''
        }
      })
    }
    setFilters(activeFilters)
    getFilteredUsers(activeFilters)
  }

  function updateFilterValue(event, filter) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {

      setFilters({
        ...filters,
        [filter]: event.target.value
      })
      getFilteredUsers({
        ...filters,
        [filter]: event.target.value
      })
    }, 500)
  }

  return (
    <div className={styles.filters}>
      <Select
        options={options(properties)}
        isMulti
        onChange={updateFiltersList}
      />
      <div className={styles.filters__active}>
        {
          Object.keys(filters).map((filter, index) => (
            <div className={styles.property} key={index}>
              <label className={styles.property_label}>{properties[filter]}:</label>
              <input
                className={styles.property_input}
                type="text"
                placeholder={properties[filter]}
                onChange={event => updateFilterValue(event, filter)}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    properties: state.users.properties
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getFilteredUsers: filters => dispatch(updateUsersList(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)