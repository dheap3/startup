import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import "./play.css";

const GamePlay = () => {
  const [keyPressed, setNewCommand] = useState('Command');
  const [commandColor, setCommandColor] = useState("rgb(223, 223, 223)");
  const [topGoalColor, setTopGoalColor] = useState("hsl(${Math.random() * 360}, 100%, 75%)");
  const [leftGoalColor, setLeftGoalColor] = useState("hsl(${Math.random() * 360}, 100%, 75%)");
  const [rightGoalColor, setRightGoalColor] = useState("hsl(${Math.random() * 360}, 100%, 75%)");
  const [bottomGoalColor, setBottomGoalColor] = useState("hsl(${Math.random() * 360}, 100%, 75%)");
  const [animateText, setAnimateText] = useState(false);
  const colorSelection = ['orange', 'blue', 'green', 'magenta'];
  let colorsAvailable = colorSelection;

  useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'w' || event.key === 's' || event.key === 'a' || event.key === 'd') {
          setNewCommand(`${event.key}`);
          setAnimateText(true);
          setTimeout(() => {
            // setColor(`hsl(${Math.floor(Math.random() * 4) * 36}, 100%, 75%)`);
            //change command and one goal to match
            setCommandColor(() => {
              const keyColor = colorsAvailable[Math.floor(Math.random() * 4)];
              colorsAvailable = colorSelection.filter(color => color !== keyColor);
              console.log(colorsAvailable);
              console.log(keyColor);
              let matchingGoal = Math.floor(Math.random() * 4);
              if (matchingGoal === 0) {
                setTopGoalColor(keyColor);
                setLeftGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
                setRightGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
                setBottomGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
              }
              if (matchingGoal === 1) {
                setLeftGoalColor(keyColor);
                setTopGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
                setRightGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
                setBottomGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
              }
              if (matchingGoal === 2) {
                setRightGoalColor(keyColor);
                setTopGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
                setLeftGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
                setBottomGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
              }
              if (matchingGoal === 3) {
                setBottomGoalColor(keyColor);
                setTopGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
                setLeftGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
                setRightGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
              }
              return keyColor;
            });
            // change the rest of the goals
            // setTopGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
            // setLeftGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
            // setRightGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
            // setBottomGoalColor(colorsAvailable[Math.floor(Math.random() * 3)]);
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
        id="command">Command</motion.div>

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