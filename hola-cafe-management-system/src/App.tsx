import { ReactNode } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/structure/Layout'
import { Navigate } from 'react-router-dom'

/* Pages */
import SamplePage from './pages/sample-page'
import InventoryComponent from './pages/inventory-component' 

function App(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<Layout />}  >
        <Route index path="" element={<Navigate to="inventory" />} />
        <Route path="sample" element={<SamplePage />} />
        <Route path="inventory" element={<InventoryComponent />} />
      </Route>
    </Routes>
  )
}

export default App
