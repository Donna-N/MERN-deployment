import React from 'react';
import {Router} from '@reach/router'

import Main from './views/Main';
import NewPet from './views/AddPet';
import PetDetail from './views/PetDetail';
import Update from './views/UpdatePet';

function App() {
  return (
    <div className="App" style = {{padding: "15px"}}>
      <Router>
        <Main path = '/' />
        <NewPet path = '/pets/new' />
        <PetDetail path = '/pets/:id' />
        <Update path = '/pets/:id/edit'/>
      </Router>
    </div>
  );
}

export default App;
