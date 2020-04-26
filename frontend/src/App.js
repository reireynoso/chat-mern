import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';

import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'



const App = () => {
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    fetch(`http://localhost:4000/rooms`)
    .then(res => res.json())
    .then(rooms => setRooms(rooms))
  },[])
  return(
    <Router>
      <Route exact path="/" render={(routerProps) => <Join {...routerProps} rooms={rooms}/>}/>
      <Route path="/chat" component={Chat}/>
    </Router>
  );
}

export default App;
