import React, { useState, useEffect } from 'react'
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import BranchCRUD from './services/question-service';


const Home = props => {

    const [ branch, setBranch ] = useState([])
    const branchService = new BranchCRUD();
    const getAllBranch = () => {
        branchService.getAll().then(res=>setBranch(res));
    }
    useEffect(() => {
        getAllBranch()
    }, [])

    return (
        <div>
            <h3>Popcorn</h3>
            
            <header className="App-header">
            <img src={logo} className="App-logo" width= "50px" alt="logo" />
            <h1>Olvida todo lo que sabes <br></br>de <u>seguros</u> y protegete hoy.</h1>
            </header>
            <body>
                <Link to="/hogar/1" className="StartButton">Ve nuestros precios</Link>
                {
                    branch.map(topic => {
                    return <Link to={`/hogar/1/${topic._id}`} className="StartButton">{topic.branch}}</Link>
                    })
                }
            </body>
          
        </div>
    )
}


export default Home