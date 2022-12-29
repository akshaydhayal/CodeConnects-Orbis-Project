import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import { Orbis } from "@orbisclub/orbis-sdk";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Share from "./components/Share/Share";
import Home from "./pages/Home/Home";

/** Initialize the Orbis class object */
let orbis = new Orbis();

function App() {
  const [user, setUser] = useState();
  const [postContent, setPostContent] = useState();
  const [groupStream, setGroupStream] = useState();

  
  const getPostHandler = async () => {
    let { data, error } = await orbis.getPosts({
      did: "did:pkh:solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp:GCm2WBW8ZeYeDRsPH6hhZ8EEabkVcEDY49uanaDMwS1H",
    });
    console.log("Get Post Data : ", data);
  };

  const createGroupHandler = async () => {
    let res = await orbis.createGroup({
      pfp: "https://img.freepik.com/free-vector/code-logo-template-gradient-design_23-2148810395.jpg?size=338&ext=jpg",
      name: "CodeConnects Dev Group ",
      description:
        "A community for developers to connect and share their knowledge",
    });
    console.log("Group Created : ", res);
    setGroupStream(res.doc);
    console.log("Group Stream : ", groupStream);
  };

  const updateGroupHandler = async () => {
    let res = await orbis.updateGroup(
      "kjzl6cwe1jw149qt2dwua7hq61wpio1ji6d468kvbd1twupsg5vhg7gj9tp1apn",
      {
        pfp: "https://img.freepik.com/free-vector/code-logo-template-gradient-design_23-2148810395.jpg?size=338&ext=jpg",
        name: "CodeConnects Dev Community ",
        description:
          "A community for developers to connect and share their dev skills and knowledge",
      }
    );

    console.log("Group Updated : ", res);
    await setGroupStream(res.doc);
    console.log("Group Stream : ", groupStream);
  };

  const groupJoinHandler=async()=>{
    let res = await orbis.setGroupMember(
      "kjzl6cwe1jw149qt2dwua7hq61wpio1ji6d468kvbd1twupsg5vhg7gj9tp1apn",
      true
    );
    console.log("Group Joined : ", res);
    console.log("Group id : ", groupStream);
  }
  const groupLeaveHandler = async () => {
    let res = await orbis.setGroupMember(
      "kjzl6cwe1jw149qt2dwua7hq61wpio1ji6d468kvbd1twupsg5vhg7gj9tp1apn",
      false
    );
    console.log("Group left : ", res);
    console.log("Group id : ", groupStream);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
      <Navbar orbis={orbis} />
      <Share orbis={orbis} />
      <header className="App-header">
        <h1>Hello from ORBIS-REACT APP!</h1>
        {/* {user ? (
          <p>Connected</p>
        ) : (
          <button onClick={() => connectToOrbis()}>Connect</button>
        )} */}

        <button onClick={getPostHandler}>Get Post</button>
        <button onClick={createGroupHandler}>Create Group</button>
        <button onClick={updateGroupHandler}>Update Group</button>
        <button onClick={groupJoinHandler}>Join Group</button>
        <button onClick={groupLeaveHandler}>Leave Group</button>
      </header>
    </div>
  );
}

export default App;
