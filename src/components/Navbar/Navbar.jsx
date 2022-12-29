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
    console.log("Result from orbis.connect : ", res);
    let res1 = await orbis.isConnected();
    console.log("`isConnected` result : ", res1);
  }

  async function checkIsObisConnected() {
    let res = await orbis.isConnected();
    console.log(res);
    if (res.status == 200){
      setUser(res.details);
      setWalletStatus('Connected');
    }
  }

  useEffect(() => {
    checkIsObisConnected();
  }, []);
    return (
      <div className="navbar-container">
        <div className="logo-image">
          <img src="./assets/logo3.png" height={70} width={230} />
        </div>
        <div className="nav-links">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/about">
            About
          </Link>
          {user ? (
            <button className="connect-btn">Wallet Connected</button>
          ) : (
            <button className="connect-btn" onClick={() => connectToOrbis()}>
              <Link className="connect-btn" to="/connect">
                Connect Wallet
              </Link>
            </button>
          )}
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