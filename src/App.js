import React, { Fragment} from 'react';
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
                <Route exact path='/' render={() => <Home/>}/>
                <Route exact path='/hogar/:id' render={() => <MasterForm branch={"home"} />}/>
                <Route exact path='/pets/' render={() => <MasterForm branch={"pets"} />}/>
                <Route exact path='/bike/' render={() => <MasterForm branch={"bike"} />}/>
                <Route exact path='/geek/' render={() => <MasterForm branch={"geek"} />}/>
                </Fragment>
            {/* <ProtectedRoute path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute path='/projects' component={ProjectList} /> */}
      </Switch>
      </div>
    //</MyContext.Provider>
  );
}

export default App;

