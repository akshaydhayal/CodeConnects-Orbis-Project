import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import { Orbis } from "@orbisclub/orbis-sdk";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Share from "./components/Share/Share";

/** Initialize the Orbis class object */
let orbis = new Orbis();

function App() {
  const [userDid, setUserDid] = useState("null");

  async function checkIsOrbisConnected() {
    let res = await orbis.isConnected();
    console.log("rr:", res);
    if (res.status == 200) {
      setUserDid(res.did);
    }
    console.log("user did in app.js: ", res.did);
    console.log("user2 did in app.js: ", userDid);
    return userDid;
  }
  // useEffect(() => {
  //   checkIsOrbisConnected();
  // }, []);

  return (
    <div className="App">
      {console.log("LOCAL STORAGE ITEM : ", localStorage.getItem("name"))}
      {/* {console.log(checkIsOrbisConnected())} */}
      {/* {console.log("ret value : ", checkIsOrbisConnected())} */}
      <Routes>
        <Route path="/" element={<Home orbis={orbis} />} />

        <Route path="/profile" element={<Profile orbis={orbis} />} />
      </Routes>

      <header className="App-header"></header>
    </div>
  );
}

export default App;
