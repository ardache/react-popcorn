import React from 'react'
import logo from '../logo.svg';
import { Link } from 'react-router-dom';


const Home = props => {
    return (
        <div>
            <h3>Popcorn</h3>
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Olvida todo lo que sabes <br></br>de <u>seguros</u> y protegete hoy.</h1>
            <Link to="/hogar" className="StartButton">Ve nuestros precios</Link>
          </header>
        </div>
    )
}


export default Home