import React from 'react'

//imported components
import HeaderSearchbar from './header-searchbar'
import HeaderCrud from './header-crud'

interface HeaderWrapperProps {
  onLayoutChange: (layout: 'horizontal' | 'vertical') => void;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({onLayoutChange}) => {
  return (
    <header className="p-4 bg-white w-full flex flex-row">
    {/* Header searchbar */}
    <div className='flex-grow'>

    <HeaderSearchbar onLayoutChange={onLayoutChange} />
    {/* Header CRUD */}
    </div>
    <HeaderCrud />
    </header>
  )
}

export default HeaderWrapper