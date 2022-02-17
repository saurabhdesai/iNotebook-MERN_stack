import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Notestate from "./Context/Notes/Notestate";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState } from "react";
function App() {
  const [mode, setmode] = useState("light");

  const togglemode = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "#042743";
      document.body.style.color = "white";
      showAlert("Dark mode enabled", "success");
    } else {
      setmode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      showAlert("Light mode enabled", "success");
    }
  };

  const [alert, setalert] = useState(null);
  const showAlert = (msg, type) => {
    setalert({ message: msg, type: type });

    setTimeout(() => {
      setalert(null);
    }, 1800);
  };
  return (
    <Notestate>
      <Router>
        <Navbar mode={mode} togglemode={togglemode} showAlert={showAlert} />
        <Alert alert={alert} />
        <Switch>
          <Route exact path="/">
            <Home mode={mode} showAlert={showAlert} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert} />
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert} />
          </Route>
        </Switch>
      </Router>
    </Notestate>
  );
}

export default App;
