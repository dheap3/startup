# CS 260 Notes

[Class Startup](https://simon.cs260.click)
[Markdown Syntax](https://www.markdownguide.org/basic-syntax/)
[My Simon](simon.mindboggle.org)
[My Startup](startup.mindboggle.org)
[Codepen](https://codepen.io/your-work)


## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## setting up the server
### commands
sudo stands for super user do
`vi Caddyfile` starts editing Caddyfile in vim - use i to insert and edit the code and : to execute a command (save and exit -> :wq)
`ssh -i .\CS-260-Server/cs260-david.pem ubuntu@100.25.32.157`
the ip address at the end is the one that was set up on aws as an elastic ip address so the server doesn't change ip address every time it's run

### reminder about working with GitHub
1. Pull the repository's latest changes from GitHub (git pull)
2. Make changes to the code
3. Commit the changes (git commit)
4. Push the changes to GitHub (git push)

## AWS notes
-caddy takes care of making a secure connection - https://startup.mindboggle.org/
-aws is what runs the server itself, run with a default format (ami image, created by prof. Jensen) in us-east-1 N. Virginia 
-the ec2 instance is the actual server made on a computer in virginia (remember the one brought in)
-route 53 is the aws tool we used to pick a domain name with DNS (domain name system)
-once bought (mindboggle.org $14 a year, next time do .click for $3 a year haha) it needed time to be verified and created so a hosted zone was created
#### NOW ANYONE CAN ACCESS mindboggle.org :)

## HTML Notes
    <img src = "" alt = ""></img> to put in a picture
    <a href = ""></a> to put in a link
    
->Check [Codepen](https://codepen.io/your-work) for examples

->[My Simon](simon.mindboggle.org)

->[My Startup](startup.mindboggle.org)

### Steps to deploy to server
->open Git Bash

`cd ~/CS-260-Server`

> [!NOTE]
> to clone a repository from github to the server (like the files deployed for simon) use this format: `git clone https:://github.com/<repository>/<file(optional)>`

Deploy:
`./deployFiles.sh -k ../CS260-david.pem -h mindboggle.org -s simon`

##React Notes
> [!NOTE]
> npm needs to be installed in the project folder to run on the project
> install with the code below, though you may not need react-dom
```
npm init -y
npm install vite@latest -D
npm install react react-dom
```
### running a server with vite
- NPX will directly execute a Node package without referencing the package.json file. This is really useful for running JavaScript code that is meant to run as a command line program (CLI) such as Vite.
- just vite run the commmand below
``` npx vite ```
and open it in the browser by hitting ``` o ``` and enter
- for using React DOM, DOM stands for Document Object Model. It represents the structure of an HTML as a tree. JavaScript can use the DOM to manipulate elements on a webpage dynamically—changing text, styles, or even creating and deleting elements without reloading the page. (real time changes, at 300 miliseconds or whatever it is)
- using the script ```npm run dev``` in the terminal should run vite with React DOM through the package.json file as long as the
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "vite"
  },
```
is included in the .json


triple backticks ``` code here ``` before and after indicate a code block fyi

```
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/index.jsx"></script>
```
Here's a sample html body tag with noscript in case there isn't any javascript, a div with an id for the jsx to render in, and the jsx at the bottom in inline javascript

- The html has a tag that it will render the jsx in (shown above)
- The jsx has a react object that's created and connected to the id in the html element. Object.render will run the funciton App (in this case). App is where the html/js will go that can call other functions (like page in this case)
- Notice that CSS was imported here as well, react is streamlining the whole thing
- The tags in this jsx file are being rendered by react (notice the import BrowserRouter, Routes, etc. from react-dom) and thus should look similar but could look and act a little different than a normal html page
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './styles.css';

function Page({ color }) {
  return (
    <div className="page" style={{ backgroundColor: color }}>
      <h1>{color}</h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <NavLink to="/">Red</NavLink>
          <NavLink to="/green">Green</NavLink>
          <NavLink to="/blue">Blue</NavLink>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Page color="red" />} exact />
            <Route path="/green" element={<Page color="green" />} />
            <Route path="/blue" element={<Page color="blue" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```
### React Routing
- uses a NavLink and a route with the same to /blue and path /blue
- the element has the first set of {} to escape the jsx and the other ones is the object, this case a page component <Page /> with the parameter color="blue" being passed in

### Components - (Default value rendered)
.HTML
```
<div id="root"></div>
```
.CSS
```
* {
  font-family: Arial;
  padding: 0.5em;
}

.component {
  border: solid thick #888;
  margin: 0.5em 0;
  width: 500px;
}

```
.JSX - JS (Babel) in Code Pen
```
// Top level component that contains child components
function App() {
  return (
    <div>
      Function Style Component: <Demo who="function" />
    </div>
  );
}

// Child component
function Demo(props) {
  const [outlook, setOutlook] = React.useState("starting string");
  const [background, setBackground] = React.useState("#0000FF");

  function changeOutlook() {
    setOutlook(outlook === "exciting" ? "beautiful" : "exciting");
  }

  function changeBackground() {
    setBackground(background === "#00FF00" ? "#FF0000" : "#00FF00");
  }

  return (
    <div className="component">
      <p style={{ backgroundColor: background }}>
        Hello {outlook} {props.who}
      </p>
      <button onClick={changeOutlook}>change</button>
      <button onClick={changeBackground}>background</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```
notice React.useState("starting string"); is the default value when the page is first rendered, after that it'll use the change functions to swap colors
