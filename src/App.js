import React, { Fragment } from 'react';
import './App.css';
import { Switch, Route, useParams } from 'react-router-dom';
import MasterForm from './components/form/MasterForm'
import BranchAdmin from './components/admin/BranchAdmin'
import QuestionsAdmin from './components/admin/QuestionAdmin'
import AnswerAdmin from './components/admin/AnswerAdmin'
import Home from './components/Home';

//import MyContext from './context';

function App() {

  const params  = useParams("/branch/:branch/idalgo/:ida");
  const { branch } = params
  //const [ theBranch, setTheBranch ] = useState(null);

  return (
    //<MyContext.Provider value={{branch: theBranch, updateContext: setTheBranch}}>
      <div className="App">
      <Switch>
              <Fragment>
                <Route exact path='/' render={() => <Home/>}/>
                <Route exact path='/hogar/:id' render={() => <MasterForm branch={"hogar"} />}/>
                <Route exact path={`/${branch}/:id`} render={() => <MasterForm branch={"Electronica"} />}/>
                <Route exact path='/Servicio/:id' render={() => <MasterForm branch={"Servicio"} />}/>
                <Route exact path='/Electronica/' render={() => <MasterForm branch={"Electronica"} />}/>
                <Route exact path='/branchadmin/' render={() => <BranchAdmin />}/>
                <Route exact path='/questionadmin/:branch/:_id' render={() => <QuestionsAdmin />}/>
                <Route exact path='/answer/:_id' render={() => <AnswerAdmin branch={ "Electronica" } />}/>
                <Route exact path='/branchadmin/:id' render={() => <BranchAdmin />}/>
                </Fragment>
            {/* <ProtectedRoute path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute path='/projects' component={ProjectList} /> */}
      </Switch>
      </div>
    //</MyContext.Provider>
  );
}

export default App;

