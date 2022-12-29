import "./Share.css";
import { useState } from "react";

import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LabelIcon from "@mui/icons-material/Label";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Share({orbis}) {
    const [postContent, setPostContent] = useState();

const postHandler = async () => {
  let res = await orbis.createPost({
    body: postContent,
    context: "kjzl6cwe1jw149qt2dwua7hq61wpio1ji6d468kvbd1twupsg5vhg7gj9tp1apn",
  });
  console.log("Res from Post : ", res);
};

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input
            placeholder="What's in your mind Safak?"
            className="shareInput"
            onChange={(e) => {
              console.log("Typed : ", e.target.value);
              setPostContent(e.target.value);
            }}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
            </div>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <LocationOnIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" onClick={postHandler}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
