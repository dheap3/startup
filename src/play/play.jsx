import React from 'react';
import "./play.css";

export function Play() {
  return (
    <main>
      <div class="goal" id="top"></div>
      <div id="inline">
        <div class="goal" id="left"></div>
        <div id="command">Command</div>
        <div class="goal" id="right"></div>
      </div>
      <div class="goal" id ="bottom"></div>
      
      <p>API notifications of people passing you on the leaderboard go here</p>
    </main>
  );
}