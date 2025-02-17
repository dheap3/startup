import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
        <body>
      <header>
        <h1 class="Title">Mind Boggle</h1>
        <nav>
            <li class="link"><a href="login.html">Login</a></li>
          <li class="link"><a href="index.html">Home</a></li>
          <li class="link"><a href="scores.html">Scores</a></li>
          <li class="link"><a href="htp.html">How To Play</a></li>
      </nav>
      </header>
  
      <main>
        component here
      </main>
      <footer>
        <span>David Heap</span>
      
        <a class="link" href="https://github.com/dheap3/startup.git">GitHub</a>
      </footer>
  
  
  </body>
    );
}