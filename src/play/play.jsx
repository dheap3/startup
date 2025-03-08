import React, {useState, useEffect} from 'react';
import "./play.css";
import { GamePlay } from './gameplay';
import { useLocation } from 'react-router-dom';

export function Play() {
  const location = useLocation();
  const userName = location.state?.userName || "Guest";

  console.log(userName, " is playing");
  return (
    <main>
      <GamePlay userName={userName}/>
      <p>API notifications of people passing you on the leaderboard go here</p>
    </main>
  );
}