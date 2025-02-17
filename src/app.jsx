import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { HTP } from './howToPlay/htp';


export default function App() {
return (
    <BrowserRouter>
    <div className="html">
        <header className='header'>
            <img id="logo" src="mind-swipe-logo.png" alt="logo png"></img>
            <h1 className="Title">Mind Boggle</h1>
            <nav>
                <li className="link"><NavLink to="/">Login</NavLink></li>
                <li className="link"><NavLink to="/play">Play</NavLink></li>
                <li className="link"><NavLink to="/scores">Scores</NavLink></li>
                <li className="link"><NavLink to="/htp">How To Play</NavLink></li>
            </nav>
        </header>

        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/play' element={<Play />} />
            <Route path='/scores' element={<Scores />} />
            <Route path='/htp' element={<HTP />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
        
        <footer>
            <span>David Heap</span>
        
            <a className="link" href="https://github.com/dheap3/startup.git">GitHub</a>
        </footer>
    </div>
    </BrowserRouter>
);
}
function NotFound() {
return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}