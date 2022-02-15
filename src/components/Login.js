import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Login(props) {
  const [credential, setcredential] = useState({ email: "", password: "" });
  let history = useHistory();
  const login = async (e) => {
    const host = "http://localhost:5000";
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert("login successful", "success");
      history.push("/");
    } else {
      props.showAlert("Invalid Credential", "danger");
    }
  };
  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h1 className="my-4">Login to continue with iNotebook</h1>
      <form>
        <div className="mb-3 my-4 py-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={onchange}
          />
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={onchange}
          />
        </div>

        <button type="submit" onClick={login} className="btn btn-primary">
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
