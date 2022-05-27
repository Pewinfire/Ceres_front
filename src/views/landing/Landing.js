import React, { useState } from "react";
import "./Landing.css";
import InputLanding from "../../shared/components/FormElements/InputLanding";

const Landing = () => {
  const [img, setImg] = useState(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
  
  return (
    <div className="videoWrapper">
      <div className="pattern"> </div>
      <video
        autoPlay
        loop
        muted
        src={`${process.env.REACT_APP_BACKEND_IMG}/uploads/images/Background${img}.mp4`}
      ></video>

      <div className="contenido-del-video">
        <InputLanding />
      </div>
    </div>
  );
};

export default Landing;
