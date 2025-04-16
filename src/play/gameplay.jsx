import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import "./play.css";
import { useNavigate } from 'react-router-dom';

export function GamePlay({ userName }) {
  const [keyPressed, setNewCommand] = useState('Command');
  const [commandColor, setCommandColor] = useState("rgb(223, 223, 223)");
  //`hsl(${Math.random() * 360}, 100%, 75%)` // random color
  const [topGoalColor, setTopGoalColor] = useState(`Orange`);
  const [leftGoalColor, setLeftGoalColor] = useState(`Blue`);
  const [rightGoalColor, setRightGoalColor] = useState(`Green`);
  const [bottomGoalColor, setBottomGoalColor] = useState(`Magenta`);
  const [animateText, setAnimateText] = useState(false);
  const [currUser, setCurrUser] = useState(userName);
  const colorSelection = ['Orange', 'Blue', 'Green', 'Magenta', 'Red', 'Yellow', 'Purple'];
  let colorsAvailable = colorSelection;

  let orderKey = [];
  let orderResponses = [];
  let [currScore, setCurrScore] = useState(0);

  //set the command word
  const [commandWord, setCommandWord] = useState('Start');
  const commands = ['Up', 'Down', 'Left', 'Right', 'North', 'South', 'East', 'West'].concat(colorsAvailable);
  function changeCommand() {
    let num = Math.floor(Math.random() * commands.length);
    let commandWord = commands[num];
    setCommandWord(commandWord);
    return commandWord;
  }

  function randomColor() {
    let color = colorsAvailable[Math.floor(Math.random() * colorsAvailable.length)];
    return color;
  }

  async function saveScore(score) {
    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };
  
    await fetch('/api/score', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newScore),
    });
  
    // Let other players know the game has concluded
    GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);
  }

  function updateScoresLocal(newScore) {
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (newScore.score > prevScore.score) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

    if (!found) {
      scores.push(newScore);
    }

    if (scores.length > 10) {
      scores.length = 10;
    }

    localStorage.setItem('scores', JSON.stringify(scores));
  }

  const navigate = useNavigate();
  const proceedToScores = () => {
    navigate('/scores', { state: { userName: userName, score: currScore } });
  }

  useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'w' || event.key === 's' || event.key === 'a' || event.key === 'd') {
          setNewCommand(`${event.key}`);
          setAnimateText(true);
          setTimeout(() => {
            // setColor(`hsl(${Math.floor(Math.random() * 4) * 36}, 100%, 75%)`);
            //change command and one goal to match
            setCommandColor(() => {
              //reset the colors available
              colorsAvailable = colorSelection;
              let keyColor = randomColor();
              //change the command word, if it's a color, set the key color to that color
              let daCommand = changeCommand();

              if (colorsAvailable.includes(daCommand)) {
                keyColor = daCommand;
              }
              
              //remove the color from the available colors
              colorsAvailable = colorsAvailable.filter(color => color !== keyColor);

              //set the goals to random colors
              let matchingGoal = Math.floor(Math.random() * 4); //4 goals
              
              //add the response to the orderResponses array
              orderResponses.push(event.key);
              //add to the orderKey array to check the correct order of commands
              if (daCommand === 'Up' || daCommand === 'North') {
                orderKey.push('ArrowUp');
              } else if (daCommand === 'Left' || daCommand === 'West') {
                orderKey.push('ArrowLeft');
              } else if (daCommand === 'Right' || daCommand === 'East') {
                orderKey.push('ArrowRight');
              } else if (daCommand === 'Down' || daCommand === 'South') {
                orderKey.push('ArrowDown');
              } else {//daCommand is a color
                if (matchingGoal === 0) {
                  orderKey.push('ArrowUp');
                } else if (matchingGoal === 1) {
                  orderKey.push('ArrowLeft');
                } else if (matchingGoal === 2) {
                  orderKey.push('ArrowRight');
                } else if (matchingGoal === 3) {
                  orderKey.push('ArrowDown');
                }
              }
              console.log(orderResponses);
              console.log(orderKey);
              if (orderResponses.length >= 2 && orderKey.length >= 2) { //most recent response received compared with the last right answer (not the newly generated answer)
                if (orderResponses.at(-1) === orderKey.at(-2)) {
                  console.log('correct');
                  setCurrScore(currScore => currScore + 1);
                } else {
                  console.log('incorrect');
                  saveScore(currScore);
                  setCurrScore(0);
                }
              }

              if (matchingGoal === 0) {
                setTopGoalColor(keyColor);
                setLeftGoalColor(randomColor());
                setRightGoalColor(randomColor());
                setBottomGoalColor(randomColor());
              }
              if (matchingGoal === 1) {
                setLeftGoalColor(keyColor);
                setTopGoalColor(randomColor());
                setRightGoalColor(randomColor());
                setBottomGoalColor(randomColor());
              }
              if (matchingGoal === 2) {
                setRightGoalColor(keyColor);
                setTopGoalColor(randomColor());
                setLeftGoalColor(randomColor());
                setBottomGoalColor(randomColor());
              }
              if (matchingGoal === 3) {
                setBottomGoalColor(keyColor);
                setTopGoalColor(randomColor());
                setLeftGoalColor(randomColor());
                setRightGoalColor(randomColor());
              }
              return keyColor;
            });
            // changeCommand();
          }, 400);//400 miliseconds is .4 seconds, the same time as the animation duration doubled to return to home position (1,1)
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div>
      <div id="score">User: {currUser}<br></br>Score: {currScore}</div>
      <button onClick={() => {proceedToScores()}}>See My Scores</button>
      <div id="gameplaycomponent">
        <div className="goal" id="top" style={{backgroundColor: topGoalColor}}></div>
        <div id="inline">
          <div className="goal" id="left" style={{backgroundColor: leftGoalColor}}></div>
          
          {/* command in the middle, moving around */}
          <motion.div
          initial={{ y: 0 }}
          animate={
            animateText ?
              keyPressed === 'ArrowUp' || keyPressed === 'w' ? { y: -101, opacity: 0 } : 
              keyPressed === 'ArrowDown' || keyPressed === 's' ? { y: 101, opacity: 0 } : 
              keyPressed === 'ArrowLeft' || keyPressed === 'a' ? { x: -101, opacity: 0 } : 
              keyPressed === 'ArrowRight' || keyPressed === 'd' ? { x: 101, opacity: 0 } : { y: 1, opacity: 1 }
            : { y: 1, opacity: 1 }
          }
          transition={{ duration: 0.2 }}

          onAnimationComplete={() => { setAnimateText(false); }}
          style={{color: commandColor}}
          id="command">{commandWord}</motion.div>

          <div className="goal" id="right" style={{backgroundColor: rightGoalColor}}></div>
        </div>
        <div className="goal" id ="bottom" style={{backgroundColor: bottomGoalColor}}></div>
      </div>
    </div>
  );
};