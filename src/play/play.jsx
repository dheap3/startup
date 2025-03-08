import React, {useState, useEffect} from 'react';
import "./play.css";
import { GamePlay } from './gameplay';

export function Play(userName) {
  return (
    <main>
      <GamePlay userName={userName}/>
      <p>API notifications of people passing you on the leaderboard go here</p>
    </main>
  );
}