import React from 'react';
import "./play.css";

export function Play() {
  return (
    <main>
      <div className="goal" id="top"></div>
      <div id="inline">
        <div className="goal" id="left"></div>
        <div id="command">Command</div>
        <div className="goal" id="right"></div>
      </div>
      <div className="goal" id ="bottom"></div>

      <p>API notifications of people passing you on the leaderboard go here</p>
    </main>
  );
}