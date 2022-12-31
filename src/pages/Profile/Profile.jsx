import React, { useEffect } from "react";
import "./Profile.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";
import UpdateProfileModal from "./UpdateProfileModal";

import Navbar from "../../components/Navbar/Navbar";
import Share from "../../components/Share/Share";
import { useState } from "react";
import Rightbar from "../../components/RightBar/Rightbar";

export default function Profile({ orbis }) {
  //   localStorage.setItem('name','Akshay');
  const [userDid, setUserDid] = useState(null);
  const [userData, setUserData] = useState("abba");
  const [profileUpdateStatus, setProfileUpdateStatus] = useState(false);
  const [show, setShow] = useState(false);

  const updateProfileHandler = async () => {
    let res = await orbis.updateProfile({
      pfp: "https://img.freepik.com/free-vector/code-logo-template-gradient-design_23-2148810395.jpg?size=338&ext=jpg",
      username: "Akshay99",
      cover:
        "https://img.freepik.com/free-vector/code-logo-template-gradient-design_23-2148810395.jpg?size=338&ext=jpg",
      description: "Hello, I love web3 very much",
    });
    console.log("Profile updated: ", res);
  };

  const getProfileData = async () => {
    let { data, error } = await orbis.getProfile(
      localStorage.getItem("userDid")
    );
    console.log("Profile data from getProfile function: ", data);

    localStorage.setItem("userProfileData", JSON.stringify(data));
    setTimeout(() => {
      setUserData(JSON.parse(localStorage.getItem("userProfileData")));
      console.log("after 3 sec");
    }, 5000);
    // userData = JSON.parse(localStorage.getItem('userProfileData'));
  };
  useEffect(() => {
    getProfileData();
  }, []);
  //   userData = JSON.parse(localStorage.getItem("userProfileData"));
  console.log(
    "json string : ",
    JSON.parse(localStorage.getItem("userProfileData"))
  );
  console.log("userData state : ", userData);
  return (
    <>
      {/* {console.log(getProfileData())} */}
      <Navbar orbis={orbis} />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="
                alt=""
              />
              <img
                className="profileUserImg"
                src="https://img.freepik.com/free-vector/code-logo-template-gradient-design_23-2148810395.jpg?size=338&ext=jpg"
                alt=""
              />
            </div>
            <div className="profileInfo">
              <button
                onClick={() => {
                 console.log("clicked status: ",show);
                  setShow(true);
                //   <UpdateProfileModal
                //     title="Update your Profile"
                //     onClose={() => setShow(false)}
                //     show={show}
                //     orbis={orbis}
                //   />;
                }}
              >
                Update Profile Modal
              </button>
              <UpdateProfileModal
                title="Update your Profile"
                onClose={() => setShow(false)}
                show={show}
                orbis={orbis}
              />
              <h4 className="profileInfoName">Safak Kocaoglu</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
              {/* <p>{localStorage.getItem("userProfileData")}</p> */}

              <h4>Address : {userData.address}</h4>
              <h4>userName : {userData.username}</h4>
              {/* <h3>{userData.did}</h3>
              <h3>{userData.username}</h3>
              <h3>{userData.count_followers}</h3> */}
              {/* <h3>{userData.count_following}</h3> */}
              {/* <h3>{userData.details.github_details}</h3> */}
            </div>
          </div>
          <div className="profileRightBottom">
            <Share orbis={orbis} />

            {/* <Post /> */}

            <Rightbar />
            {/* <Rightbar profile /> */}
          </div>
          {/* <button onClick={updateProfileHandler}>Update Profile</button> */}
        </div>
      </div>
    </>
  );
}
