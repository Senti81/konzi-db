import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import useAuth from './hooks/useAuth'
import Login from './components/Login'
import Spinner from './components/Spinner'
import Navbar from './components/Navbar'

import { Home } from './pages/home/index'
import { Events } from './pages/events/index'
import { Event } from './pages/event/index'
import { Add } from './pages/addEvent/index'
import { Edit } from './pages/editEvent/index'
import { Profile } from './pages/profile/index'

// import './App.css';

function App() {
  const { user, loading } = useAuth()

  if (loading) return <Spinner />
  if (!user) return <Login />

  return (
    <div className="App">
      <BrowserRouter>
        <div style={{ paddingTop: '75px' }}>
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path='profile' element={<Profile />} />
              <Route path='events' element={<Events />} />
              <Route path='events/add' element={<Add />} />
              <Route path='events/:id' element={<Event />} />
              <Route path='events/:id/edit' element={<Edit />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
