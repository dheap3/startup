import React from 'react';
import { useLocation } from 'react-router-dom';

export function Scores() {
  const location = useLocation();
  const { userName, score } = location.state || { userName: "Unknown", score: -1 };

  return (
    <main>
        <h1>Your current Highscores</h1>
        <li>{userName} : {score}</li>
        <li>1. 20</li>
        <li>2. 10</li>
        <li>3. 1</li>
      </main>
  );
}