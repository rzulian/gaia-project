import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import _ from 'lodash';
import Singleplayer from './components/singleplayer';
import Multiplayer from './components/multiplayer';
//import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="container">
    
      <Route  component={Singleplayer} />
   
    </div>
  </BrowserRouter>
);
// for some reasone I cannot route test to singleplayer, therefore I'm making it constant

export default App;
