import React, { useEffect } from 'react';
import "./login.css";
import { useNavigate } from 'react-router-dom';

let allUserInfo = [
  { username: "masteruser", password: "masterpassword" }
];
let verified = false;

const verifyUser = (username, password) => {//userInfo = [{ username: "qwerty", password: "qwerty" }]
  console.log(allUserInfo);
  for (let i = 0; i < allUserInfo.length; i++) {
    if (username === allUserInfo[i].username && password === allUserInfo[i].password) {
      verified = true;
    }
  }
};

export function Login() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const proceedToPlay = () => {
    if (verified) {
      navigate('/play');
    } else {
      console.log("User not found, please create an account and then login.");
    }
  }

  return (
    <main>
        <div id="login">
            <p>Login to Mind Boggle</p>
            <form id ="loginForm"> {/* not called in the css, but fixes an error in the chrome compiler */}
              <input placeholder="username" onChange={(e) => setUserName(e.target.value)}/>
              <input placeholder="password" type ="password" onChange={(e) => setPassword(e.target.value)}/>
              <button type="button" onClick={() => {verifyUser(userName, password); proceedToPlay()}}>Login</button>
              <button>Create</button>
            </form>
          </div>
      </main>
  );
}