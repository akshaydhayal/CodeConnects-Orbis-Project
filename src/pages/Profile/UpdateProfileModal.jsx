import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./UpdateProfileModal.css";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function UpdateProfileModal(props) {
 const [updatedUserDetails,setUpdatedUserDetails]=useState({});
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };
  const updateProfileHandler = async () => {
    let res = await props.orbis.updateProfile({
      pfp: updatedUserDetails.profileUrl,
      username: updatedUserDetails.username,
      cover:updatedUserDetails.coverUrl,
      description: updatedUserDetails.userBio,
      //   pfp: "https://img.freepik.com/free-vector/code-logo-template-gradient-design_23-2148810395.jpg?size=338&ext=jpg",
      //   username: "Akshayd99",
      //   cover:
      //     "https://img.freepik.com/free-vector/code-logo-template-gradient-design_23-2148810395.jpg?size=338&ext=jpg",
      //   description: "Hello, I love web3 very much,thanks",
    });
    console.log("Profile updated: from Modal component", res);
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">{props.title}</h3>
            <CancelIcon onClick={props.onClose} />
          </div>
          {/* <div className="modal-body">{props.children}</div> */}
          <div className="form-inputs">
            <TextField
              //   className="form-input-texts"
              id="outlined-basic"
              label="Enter username"
              variant="outlined"
              size="small"
              onChange={async(e) => {
                await setUpdatedUserDetails({
                  ...updatedUserDetails,
                  username: e.target.value,
                });
                console.log("user object : ", updatedUserDetails);
              }}
            />
            <TextField
              //   className="form-input-texts"
              id="outlined-basic"
              label="Write a short bio"
              variant="outlined"
              size="small"
              onChange={async(e) => {
                await setUpdatedUserDetails({
                  ...updatedUserDetails,
                  userBio: e.target.value,
                });
                console.log("user object : ", updatedUserDetails);
              }}
            />
            <TextField
              //   className="form-input-texts"
              id="outlined-basic"
              label="Give profile picture URL"
              variant="outlined"
              size="small"
              onChange={async(e) => {
                await setUpdatedUserDetails({
                  ...updatedUserDetails,
                  profileUrl: e.target.value,
                });
                console.log("user object : ", updatedUserDetails);
              }}
            />
            <TextField
              //   className="form-input-texts"
              id="outlined-basic"
              label="Cover picture URL"
              variant="outlined"
              size="small"
              onChange={async(e) => {
                await setUpdatedUserDetails({
                  ...updatedUserDetails,
                  coverUrl: e.target.value,
                });
                console.log("user object : ", updatedUserDetails);
              }}
            />
          </div>

          <div className="modal-footer">
            <Button
              className="update-btn"
              onClick={updateProfileHandler}
              variant="contained"
            >
              Update profile
            </Button>
            {/* <button onClick={props.onClose} className="button">
              Close
            </button> */}
          </div>
          {/* <button onClick={updateProfileHandler}>Update profile</button> */}
        </div>
      </div>
    </CSSTransition>
  );
}

// const Modal = (props) => {
//   const closeOnEscapeKeyDown = (e) => {
//     if ((e.charCode || e.keyCode) === 27) {
//       props.onClose();
//     }
//   };

//   useEffect(() => {
//     document.body.addEventListener("keydown", closeOnEscapeKeyDown);
//     return function cleanup() {
//       document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
//     };
//   }, []);

//   return ReactDOM.createPortal(
//     <CSSTransition
//       in={props.show}
//       unmountOnExit
//       timeout={{ enter: 0, exit: 300 }}
//     >
//       <div className="modal" onClick={props.onClose}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <div className="modal-header">
//             <h4 className="modal-title">{props.title}</h4>
//           </div>
//           <div className="modal-body">{props.children}</div>
//           <div className="modal-footer">
//             <button onClick={props.onClose} className="button">
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </CSSTransition>,
//     document.getElementById("root")
//   );
// };

//export default Modal;
