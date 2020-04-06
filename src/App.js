import React, { Fragment, useState, useContext  } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import MasterForm from './components/form/MasterForm'
import BranchAdmin from './components/admin/BranchAdmin'
import Home from './components/Home';
import MyContext from './context';

function App() {

  const { branch } = useContext(MyContext);
  const [ theBranch, setTheBranch ] = useState(null);

  return (
    <MyContext.Provider value={{branch: theBranch, updateContext: setTheBranch}}>
      <div className="App">
      <Switch>
              <Fragment>
                <Route exact path='/' render={() => <Home/>}/>
                <Route exact path='/hogar/:id' render={() => <MasterForm branch={branch} />}/>
                <Route exact path='/Pandemias/:id' render={() => <MasterForm branch={"pets"} />}/>
                <Route exact path='/Bicicleta/:id' render={() => <MasterForm branch={"bike"} />}/>
                <Route exact path='/geek/' render={() => <MasterForm branch={"geek"} />}/>
                <Route exact path='/branchadmin/' render={() => <BranchAdmin />}/>
                </Fragment>
            {/* <ProtectedRoute path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute path='/projects' component={ProjectList} /> */}
      </Switch>
      </div>
    </MyContext.Provider>
  );
}

export default App;

