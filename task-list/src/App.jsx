import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Nav from './Layout/Nav'
import MainLayout from './Layout/MainLayout'
import React, { lazy, Suspense } from "react"
import TaskList from './pages/TaskList'
//import NotFound from './pages/NotFound'
//import AddTask from './pages/AddTask'
//import EditTask from './pages/EditTask'

const AddTask = lazy(() => import("./pages/AddTask"))
const EditTask = lazy(() => import("./pages/EditTask"))
const NotFound = lazy(() => import('./pages/NotFound'))
function App() {

  return (
    <>
    <BrowserRouter>
      
      <Nav></Nav>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<TaskList />} />
              <Route path="add" element={<AddTask />} />
              <Route path="edit/:id" element={<EditTask />} />
              <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App
