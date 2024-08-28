import { ReactNode } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/structure/Layout'
import { Navigate } from 'react-router-dom'

/* Pages */
import SamplePage from './pages/sample-page'
import InventoryPage from './pages/inventory-page' 
import AnalyticsPage from './pages/analytics-page'

function App(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<Layout />}  >
        <Route index path="" element={<Navigate to="inventory" />} />
        <Route path="sample" element={<SamplePage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  )
}

export default App
