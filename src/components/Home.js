import React from 'react'
import logo from '../logo.svg';
import { Link } from 'react-router-dom';


const Home = props => {
    return (
        <div>
            <h3>Popcorn</h3>
            
            <header className="App-header">
            <img src={logo} className="App-logo" width= "50px" alt="logo" />
            <h1>Olvida todo lo que sabes <br></br>de <u>seguros</u> y protegete hoy.</h1>
            </header>
            <body>
                <Link to="/hogar/1" className="StartButton">Ve nuestros precios</Link>
            </body>
          
        </div>
    )
}


export default Home