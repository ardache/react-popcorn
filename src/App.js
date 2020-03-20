import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import MasterForm from './components/form/MasterForm'
import Home from './components/Home';

function App() {
  return (
    //<MyContext.Provider>
      <div className="App">
      <Switch>
              <Fragment>
                <Route exact path='/hogar' render={() => <MasterForm/>}/>
                <Route exact path='/' render={() => <Home/>}/>
              </Fragment>
            {/* <ProtectedRoute path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute path='/projects' component={ProjectList} /> */}
      </Switch>
      </div>
    //</MyContext.Provider>
  );
}

export default App;
