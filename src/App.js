import React from 'react'
import TableContainer from './containers/TableContainer'
import ValidationProvider from './providers/ValidationProvider'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

export default function App() {
  return (
    <div className="container">
      <h1>Dynamic form</h1>
      <ValidationProvider>
        <Router>
          <Routes>
            <Route index element={<TableContainer/>}></Route>
          </Routes>
        </Router>
      </ValidationProvider>
    </div>
  )
}
