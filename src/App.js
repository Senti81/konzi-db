import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import useAuth from './hooks/useAuth'
import Login from './components/Login'
import Spinner from './components/Spinner'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import EventList from './pages/eventCalendar/EventList'
import EventDetails from './pages/eventCalendar/EventDetails'
import AddEvent from './pages/eventCalendar/AddEvent'
import EditEvent from './pages/eventCalendar/EditEvent'
import Profile from './pages/profile/Profile'

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
              <Route path='events' element={<EventList />} />
              <Route path='events/add' element={<AddEvent />} />
              <Route path='events/:id' element={<EventDetails />} />
              <Route path='events/:id/edit' element={<EditEvent />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
