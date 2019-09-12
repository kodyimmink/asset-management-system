import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';
import AddEquipment from "./components/AddEquipment";
import EditEquipment from "./components/EditEquipment";
import EquipmentNotes from "./components/EquipmentNotes";
import EquipmentDetails from "./components/EquipmentDetails";
import Sites from "./components/Sites";
import Site from "./components/Site";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Route path="/home" component={Home} />
        <Route path="/addEquipment" component={AddEquipment} />
        <Route path="/editEquipment/:id" component={EditEquipment} />
        <Route path="/equipmentNotes/:id" component={EquipmentNotes} />
        <Route path="/equipmentDetails/:id" component={EquipmentDetails} />
        <Route path="/sites" component={Sites} />
        <Route path="/site/:id" component={Site} />
      </div>
    </BrowserRouter>
  );
}

export default App;
