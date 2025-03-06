import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import "./play.css";

const GamePlay = () => {
  const [keyPressed, setNewCommand] = useState('Command');
  const [commandColor, setCommandColor] = useState("rgb(223, 223, 223)");
  //`hsl(${Math.random() * 360}, 100%, 75%)` // random color
  const [topGoalColor, setTopGoalColor] = useState(`Orange`);
  const [leftGoalColor, setLeftGoalColor] = useState(`Blue`);
  const [rightGoalColor, setRightGoalColor] = useState(`Green`);
  const [bottomGoalColor, setBottomGoalColor] = useState(`Magenta`);
  const [animateText, setAnimateText] = useState(false);
  const colorSelection = ['Orange', 'Blue', 'Green', 'Magenta', 'Red', 'Yellow', 'Purple', 'Cyan'];
  let colorsAvailable = colorSelection;

  //set the command word
  const [commandWord, setCommandWord] = useState('Start');
  const commands = ['Up', 'Down', 'Left', 'Right', 'North', 'South', 'East', 'West'].concat(colorsAvailable);
  function changeCommand() {
    let num = Math.floor(Math.random() * commands.length);
    let commandWord = commands[num];
    console.log(commandWord);
    console.log(num);
    setCommandWord(commandWord);
    return commandWord;
  }

  function randomColor() {
    let color = colorsAvailable[Math.floor(Math.random() * colorsAvailable.length)];
    return color;
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
  );
};

export function Play() {
  return (
    <main>
      <GamePlay />
      <p>API notifications of people passing you on the leaderboard go here</p>
    </main>
  );
}