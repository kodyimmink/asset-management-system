import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/Home';
import Navigation from './components/Navigation';
import AddEquipment from "./components/AddEquipment";
import EditEquipment from "./components/EditEquipment";
import EquipmentNotes from "./components/EquipmentNotes";
import EquipmentDetails from "./components/EquipmentDetails";
import Sites from "./components/Sites";
import Site from "./components/Site";
import LandingPage from './components/LandingPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Navigation />
          <Route exact path='/' component={ LandingPage }/>
          <ProtectedRoute exact path="/home" component={Home}/>
          <ProtectedRoute exact path="/addEquipment" component={AddEquipment} />
          <ProtectedRoute exact path="/editEquipment/:id" component={EditEquipment} />
          <ProtectedRoute exact path="/equipmentNotes/:id" component={EquipmentNotes} />
          <ProtectedRoute exact path="/equipmentDetails/:id" component={EquipmentDetails} />
          <ProtectedRoute exact path="/sites" component={Sites} />
          <ProtectedRoute exact path="/site/:id" component={Site} />
      </div>
    </BrowserRouter>
  );
}

export default App;