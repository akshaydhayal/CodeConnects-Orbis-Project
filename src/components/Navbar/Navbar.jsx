import React from 'react';
import './Navbar.scss';
// import { Orbis } from "@orbisclub/orbis-sdk";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Navbar({orbis}){
  const [user, setUser] = useState();
  const [postContent, setPostContent] = useState();
  const [walletStatus,setWalletStatus]=useState('Connect');

  async function connectToOrbis() {
    // let res = await orbis.connect(window.phantom);
    let res = await orbis.connect_v2({
      provider: window.phantom?.solana,
      chain: "solana",
      lit: true,
    });

    if (res.status == 200){ 
      setUser(res.details);
      setWalletStatus('Connected');
    }
    console.log("Result from orbis.connect in NAVBAR : ", res);
    let res1 = await orbis.isConnected();
    console.log("`isConnected` result : ", res1);
  }

  async function checkIsOrbisConnected() {
    
    let res = await orbis.isConnected();
    console.log(res);
    if (res.status == 200){
       localStorage.setItem("userDid", res.did);
       setTimeout(() =>{
           console.log(
             "user did from localStorage : ",
             localStorage.getItem("userDid")
           );
       },2000);
      setUser(res.details);
      setWalletStatus('Connected');
    }
    console.log("Result from orbis.connect in NAVBAR user : ", user);
  }

  useEffect(() => {
    checkIsOrbisConnected();
  }, []);
          
          

    return (
      <div className="navbar-container">
        {/* {checkIsOrbisConnected()} */}
        <div className="logo-image">
          <img src="./assets/logo3.png" height={70} width={230} />
        </div>
        <div className="nav-links">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/profile">
            Profile
          </Link>
          {user ? (
            <button className="connect-btn">Wallet Connected</button>
          ) : (
            <button className="connect-btn" onClick={() => connectToOrbis()}>
              Connect Wallet
            </button>
          )}
          <button
            className="connect-btn"
            onClick={async () => {
              let res = await orbis.logout();
              if (res.status == 200) {
                setUser(null);
              }
            }}
          >
            LogOut
          </button>
          {/* <Button
            onClick={() => {
              console.log("MUI Clicked");
            }}
            variant="outlined"
          >
            Primary
          </Button>{" "} */}
        </div>
      </div>
    );
}