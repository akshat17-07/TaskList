import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Nav from './Layout/Nav'
import MainLayout from './Layout/MainLayout'
import Task from './pages/Task'
import AddTask from './pages/AddTask'
import EditTask from './pages/EditTask'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
    <BrowserRouter>
      
      {/*This is nav bar*/}
      <Nav></Nav>

      {/*This is route for main component*/}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Task />} />
          <Route path="add" element={<AddTask />} />
          <Route path="edit/:id" element={<EditTask />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
