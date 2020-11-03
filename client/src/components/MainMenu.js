import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'

const MainMenu = () => {
  const [activeItem, setActiveItem] = useState('home')
  const handleItemClick = (e, { name }) => setActiveItem(name)
  
  return <Menu pointing secondary>
    <Menu.Item
      name='Home'
      active={activeItem === 'Home'}
      onClick={handleItemClick}
    />
    <Menu.Menu position='right'>
      <Menu.Item
        name='Login'
        active={activeItem === 'Login'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name='Register'
        active={activeItem === 'Register'}
        onClick={handleItemClick}
      />
    </Menu.Menu>
  </Menu>
}
export default MainMenu;