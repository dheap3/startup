import React from 'react';
import "./login.css";

export function Login() {
  const displayUser = () => {
    console.log("User logged in!");
  };
  return (
    <main>
        <div id="login">
            <p>Login to Mind Boggle</p>
            <form onClick={displayUser}>
              <input placeholder="your@email.com" />
              <input placeholder="password" />
              <button>Login</button>
              <button>Create</button>
            </form>
          </div>
      </main>
  );
}