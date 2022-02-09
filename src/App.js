import React from 'react'
import TableContainer from './containers/TableContainer'
import ValidationProvider from './providers/ValidationProvider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigator from './components/Navigator'
import CategoriesProvider from './providers/CategoriesProvider'

export default function App() {
  return (
    <div className="container">
      <h1>Dynamic form</h1>
      <CategoriesProvider>
        <ValidationProvider>
          <Router>
            <Routes>
              <Route index element={<Navigator />}></Route>
            </Routes>
          </Router>
        </ValidationProvider>
      </CategoriesProvider>
    </div>
  )
}
