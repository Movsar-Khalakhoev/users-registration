import React, {useState} from 'react'
import styles from './Container.module.sass'
import Sidebar from './Sidebar/Sidebar'
import Cards from './Cards/Cards'
import Hamburger from '../../UI/Hamburger/Hamburger'

const Container = () => {
  const [isSidebarActive, setIsActiveSidebar] = useState(false)
  return (
    <div className={styles.container}>
      <Hamburger
        wrapperClassName={styles.show_filters}
        textClassName={styles.text}
        text='Фильтры'
        isActive={isSidebarActive}
        onClick={() => setIsActiveSidebar(!isSidebarActive)}
      />
      <Sidebar isActive={isSidebarActive}/>
      <Cards />
    </div>
  )
}

export default Container