import React, { Fragment } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import MasterForm from './components/form/MasterForm'
import Home from './components/Home';

function App() {

  return (
    //<MyContext.Provider>
      <div className="App">
      <Switch>
              <Fragment >
                <Route exact path='/' render={() => <Home/>}/>
                <Route exact path='/hogar/1/:id' render={() => <MasterForm branch={"home"} q={1}/>}/>
                <Route exact path='/pets/1' render={() => <MasterForm branch={"pets"} q={1}/>}/>
                <Route exact path='/bike/1' render={() => <MasterForm branch={"bike"} q={1}/>}/>
                <Route exact path='/geek/1' render={() => <MasterForm branch={"geek"} q={1}/>}/>
              </Fragment>
            {/* <ProtectedRoute path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute path='/projects' component={ProjectList} /> */}
      </Switch>
      </div>
    //</MyContext.Provider>
  );
}

export default App;

