import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import "./play.css";

const GamePlay = () => {
  const [keyPressed, setNewCommand] = useState('Command');
  const [bgColor, setColor] = useState({style: {bgColor: "hsl(0, 100%, 75%)"}});
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'w' || event.key === 's' || event.key === 'a' || event.key === 'd') {
          setNewCommand(`${event.key}`);
          setAnimateText(true);
          setTimeout(() => {
            // setColor(`hsl(${Math.floor(Math.random() * 4) * 36}, 100%, 75%)`);
            setColor(`hsl(${Math.random() * 360}, 100%, 75%)`);// use later for random color;
          }, 400);//400 miliseconds is .4 seconds, the same time as the animation duration doubled to return to home position (1,1)
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <div id="gameplaycomponent">
      <div className="goal" id="top"></div>
      <div id="inline">
        <div className="goal" id="left"></div>
        
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
        style={{color: bgColor}}
        id="command">Command</motion.div>

        <div className="goal" id="right"></div>
      </div>
      <div className="goal" id ="bottom"></div>
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