import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';
import ListEquipment from "./components/ListEquipment";
import AddEquipment from "./components/AddEquipment";
import EditEquipment from "./components/EditEquipment";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Route path="/home" component={Home} />
        <Route path="/listEquipment" component={ListEquipment} />
        <Route path="/addEquipment" component={AddEquipment} />
        <Route path="/editEquipment" component={EditEquipment} />
      </div>
    </BrowserRouter>
  );
}

export default App;
