import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function Signup(props) {
  let history = useHistory();
  const [credential, setcredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  const signup = async (e) => {
    const host = "http://localhost:5000";
    e.preventDefault();
    if (credential.password == credential.cpassword) {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credential.name,
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
        props.showAlert(json.errors[0].msg, "danger");
      }
    } else {
      props.showAlert("Password and Confirm Password does not match", "danger");
    }
  };

  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-4">
        <h1>Sign up to create your notes</h1>
        <form onSubmit={signup}>
          <div className="mb-3 mt-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              name="name"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
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
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={onchange}
              required
              minLength={5}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={onchange}
              minLength={5}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
