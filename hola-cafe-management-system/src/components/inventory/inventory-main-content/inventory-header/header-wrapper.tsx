import React from 'react'

//imported components
import HeaderSearchbar from './header-searchbar'
import HeaderCrud from './header-crud'

const HeaderWrapper = () => {
  return (
    <header className="p-4 bg-white w-full flex flex-row">
    {/* Header searchbar */}
    <HeaderSearchbar />
    {/* Header CRUD */}
    <HeaderCrud />
    </header>
  )
}

export default HeaderWrapper