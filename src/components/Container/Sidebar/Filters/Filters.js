import React, {useEffect, useState} from 'react'
import styles from './Filters.module.sass'
import Select from 'react-select'
import {connect} from 'react-redux'
import {updateUsersList} from '../../../../redux/actions/users'

const options = (properties, systemProperties) => {
  let options =  []
    Object.keys(properties).forEach((property, index) => {
      if (!systemProperties.includes(property)) {
        options.push({value: property, label: properties[property]})
      }
    })
  return options
}

const Filters = ({properties, systemProperties, getFilteredUsers, selectProperties}) => {
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

  function updateFilterValue(value, filter) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {

      setFilters({
        ...filters,
        [filter]: value
      })
      getFilteredUsers({
        ...filters,
        [filter]: value
      })
    }, 500)
  }

  return (
    <div className={styles.filters}>
      <Select
        options={options(properties, systemProperties)}
        isMulti
        onChange={updateFiltersList}
      />
      <div className={styles.filters__active}>
        {
          Object.keys(filters).map((filter, index) => (
            <div className={styles.property} key={filter}>
              <label className={styles.property_label}>{properties[filter]}:</label>
              {
                !selectProperties[filter]
                  ? <input
                      className={styles.property_input}
                      type="text"
                      placeholder={properties[filter]}
                      onChange={event => updateFilterValue(event.target.value, filter)}
                    />
                  : <Select
                    options={selectProperties[filter]}
                    onChange={action => updateFilterValue(action.value, filter)}
                  />
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    properties: state.users.properties,
    systemProperties: state.users.systemProperties,
    selectProperties: state.users.selectProperties
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getFilteredUsers: filters => dispatch(updateUsersList(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)