import React, { useState, useEffect } from 'react'
import logo from '../logo.svg';
import cursor from '../popcorn.svg';
import { Link } from 'react-router-dom';
import BranchCRUD from './services/branch-service';
import { FaAccessibleIcon, FaBiohazard, FaHome, FaBicycle } from 'react-icons/fa';


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
            <img src={cursor} className="App-logo" width= "100px" alt="logo" />
            <h1>Olvida todo lo que sabes <br></br>de <u>seguros</u> y protegete hoy.</h1>
            </header>
            <body>
                {
                    branch.map(topic => {
                        let logo = ""

                       switch (topic.logo){
                            case "FaBiohazard":
                                logo = <FaBiohazard/>
                                break;
                            case "FaAccessibleIcon":
                                logo = <FaAccessibleIcon/>
                                break;
                            case "FaHome":
                                logo = <FaHome/>
                                break;
                            case "FaBicycle":
                                logo = <FaBicycle/>
                                break;
                       }
                    
                        return (
                
                        <Link to={`/hogar/${topic.next_question}`} className="StartButton" >
                          {logo}
                          {topic.name}<br></br>
                        </Link>
                    )})
                }
            </body>
          
        </div>
    )
}


export default Home