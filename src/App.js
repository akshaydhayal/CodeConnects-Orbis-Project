import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import { Orbis } from "@orbisclub/orbis-sdk";
import { useEffect, useState } from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";

/** Initialize the Orbis class object */
let orbis = new Orbis();

function App() {

  
  const [user, setUser] = useState();
  const [postContent,setPostContent]=useState();

  // async function connectToOrbis() {
  //   let res = await orbis.connect_v2({
  //     provider: window.phantom?.solana,
  //     chain: "solana",
  //     lit: true,
  //   });

  //   if (res.status == 200) setUser(res.details);
  //   console.log("Result from orbis.connect : ", res);
  //   let res1 = await orbis.isConnected();
  //   console.log("`isConnected` result : ", res1);
  // }

  // async function checkIsObisConnected() {
  //   let res = await orbis.isConnected();
  //   console.log(res);
  //   if (res.status == 200) setUser(res.details);
  // }

  // useEffect(() => {
  //   checkIsObisConnected();
  // }, []);

  const postHandler=async()=>{
    let res = await orbis.createPost({ body: postContent });
    console.log("Res from share : ", res);
    
  }
  const getPostHandler=async()=>{
    let { data, error } = await orbis.getPosts({
      did: "did:pkh:solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp:GCm2WBW8ZeYeDRsPH6hhZ8EEabkVcEDY49uanaDMwS1H",
    });
    console.log("Get Post Data : ",data);
  }

  return (
    <div className="App">
      <Navbar orbis={orbis}/>
      <header className="App-header">
        <h1>Hello from ORBIS-REACT APP!</h1>
        {/* {user ? (
          <p>Connected</p>
        ) : (
          <button onClick={() => connectToOrbis()}>Connect</button>
        )} */}

        <input type="text" placeholder="Enter Post content" 
        onChange={(e) => {setPostContent(e.target.value);}}/>
        <button onClick={postHandler}>Post Content</button>
        
      <button onClick={getPostHandler}>Get Post</button>
      </header>
    </div>
  );
}

export default App;
