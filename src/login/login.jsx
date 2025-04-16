import React, { useEffect } from 'react';
import "./login.css";
import { useNavigate } from 'react-router-dom';

let allUserInfo = [
  { username: "masteruser", password: "masterpassword" }
];

let verified = false;

const verifyUser = (username, password) => {//userInfo = [{ username: "qwerty", password: "qwerty" }]
  // console.log(allUserInfo);
  for (let i = 0; i < allUserInfo.length; i++) {
    if (username === allUserInfo[i].username && password === allUserInfo[i].password) {
      verified = true;
    }
  }
};

const createUser = (user, pass) => {
  allUserInfo.push({ username: user, password: pass });
  alert("User created! Please login to continue");
  // console.log(allUserInfo);
};

async function loginOrCreate(endpoint) {
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response?.status === 200) {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  } else {
    const body = await response.json();
    setDisplayError(`⚠ Error: ${body.msg}`);
  }
}

function logout() {
  fetch(`/api/auth/logout`, {
    method: 'delete',
  })
    .catch(() => {
      // Logout failed. Assuming offline
    })
    .finally(() => {
      localStorage.removeItem('userName');
      props.onLogout();
    });
}

export function Login() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const proceedToPlay = () => {
    if (verified) {
      navigate('/play', { state: { userName: userName } });
      // console.log(userName, "has logged in");
      verified = false;
    } else {
      // console.log("User not found, please create an account and then login.");
      alert("User not found, please create an account and then login");
    }
  }

  return (
    <main>
        <div id="login">
            <p>Login to Mind Boggle</p>
            <form id ="loginForm"> {/* not called in the css, but fixes an error in the chrome compiler */}
              <input placeholder="username" onChange={(e) => setUserName(e.target.value)}/>
              <input placeholder="password" type ="password" onChange={(e) => setPassword(e.target.value)}/>
              <button type="button" onClick={() => {verifyUser(userName, password); proceedToPlay()}}>Login</button> {/*type="button" doesn't refresh the page, hence preserving the value in local memory*/}
              <button type="button" onClick={() => {createUser(userName, password)}}>Create</button>
            </form>
          </div>
      </main>
  );
}