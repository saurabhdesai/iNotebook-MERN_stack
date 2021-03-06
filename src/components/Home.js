import React, { useContext } from "react";
import Notes from "./Notes";
function Home(props) {
  return (
    <div className="container">
      <Notes mode={props.mode} showAlert={props.showAlert} />
    </div>
  );
}

export default Home;
