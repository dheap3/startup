import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import "./play.css";

const KeyboardResponsive = () => {
  const [keyPressed, setNewCommand] = useState('Command');
  const [bgColor, setColor] = useState({style: {bgColor: "hsl(0, 100%, 80%)"}});
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
      const handleKeyDown = (event) => {
          setNewCommand(`${event.key}`);
          setAnimateText(true);
          setTimeout(() => {
            setColor(`hsl(${Math.random() * 360}, 100%, 80%)`);// use later for random color;
          }, 200);
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <motion.div
    initial={{ y: 0 }}
    animate={
      animateText ?
        keyPressed === 'ArrowUp' ? { y: -101, opacity: 0 } : 
        keyPressed === 'ArrowDown' ? { y: 101, opacity: 0 } : 
        keyPressed === 'ArrowLeft' ? { x: -101, opacity: 0 } : 
        keyPressed === 'ArrowRight' ? { x: 101, opacity: 0 } : { y: 1, opacity: 1 }
      : { y: 1, opacity: 1 }
    }
    transition={{ duration: 0.2 }}

    onAnimationComplete={() => { console.log('Animation Completed'); setAnimateText(false); }}
    style={{color: bgColor}}>Command</motion.div>
    // <motion.div
    //   initial={{ y: 0 }}
    //   animate={
    //     animateText
    //       ? keyPressed === 'ArrowUp'
    //         ? { y: -100, opacity: 0 }
    //         : keyPressed === 'ArrowDown'
    //         ? { y: 100, opacity: 0 }
    //         : keyPressed === 'ArrowLeft'
    //         ? { x: -100, opacity: 0 }
    //         : keyPressed === 'ArrowRight'
    //         ? { x: 100, opacity: 0 }
    //         : { y: 0, opacity: 1 }
    //       : { y: 0, opacity: 1 } // Move to y: 0 after initial animation
    //   }
    //   transition={{ duration: 0.5 }}
    //   onAnimationComplete={() => {
    //     console.log('First animation complete, triggering next animation');
    //     setAnimateText(false); // After the first animation, move to y: 200
    //   }}
    //   style={{ color: bgColor }}
    // >
    //   Command {keyPressed}
    // </motion.div>
  );
};

export function Play() {
  return (
    <main>
      <div className="goal" id="top"></div>
      <div id="inline">
        <div className="goal" id="left"></div>
        <div id="command"><KeyboardResponsive /></div>
        <div className="goal" id="right"></div>
      </div>
      <div className="goal" id ="bottom"></div>

      <p>API notifications of people passing you on the leaderboard go here</p>
    </main>
  );
}