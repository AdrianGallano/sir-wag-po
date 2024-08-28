import React from 'react'

//imported components
import HeaderSearchbar from './header-searchbar'

const HeaderWrapper = () => {
  return (
    <header className="p-4 bg-white w-full flex flex-row">
    {/* Header searchbar */}
    <HeaderSearchbar />
  </header>
  )
}

export default HeaderWrapper