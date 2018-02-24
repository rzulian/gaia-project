import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import _ from 'lodash';
import Singleplayer from './components/singleplayer';
import Multiplayer from './components/multiplayer';
import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="container">
    
      <Route exact path="/s" component={Singleplayer} />
      <Route exact path="/multiplayer" component={Multiplayer} />
    </div>
  </BrowserRouter>
);

export default App;
