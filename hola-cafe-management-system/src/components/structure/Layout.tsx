import { Outlet } from 'react-router-dom'
import Navbar from '../navbar'
import Sidebar from '../sidebar'

const Layout = () => {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/0">
            <Navbar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout