import { ReactNode } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/structure/Layout'
import { Navigate } from 'react-router-dom'

/* Pages */
import SamplePage from './pages/sample-page'

function App(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<Layout />}  >
        <Route index path="" element={<Navigate to="sample" />} />
        <Route path="sample" element={<SamplePage />} />
      </Route>
    </Routes>
  )
}

export default App
