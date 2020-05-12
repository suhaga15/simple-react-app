import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, toggleIsLoading] = useState(true);
  const [isImage, toggleIsImage] = useState(true);

  const getImage = async () => {
    toggleIsLoading(true);
    const response = await axios.get("https://random.dog/woof.json");
    if(response.status === 200) {
      setImageUrl(response.data.url);
      if(response.data.url.includes(".mp4")) {
        toggleIsImage(false);
      } else {
        toggleIsImage(true);
      }
      localStorage.setItem("imageUrl", response.data.url);
      console.log(response.data.url);
    } else {
      alert("Error loading image. Please reload the page");
    }
  }

  useEffect(() => {
    if(!localStorage.getItem("imageUrl")) {
      getImage();
    } else {
      let url = localStorage.getItem("imageUrl");
      setImageUrl(url);
      if(url.includes(".mp4")) {
        toggleIsImage(false);
      } else {
        toggleIsImage(true);
      }
    }
  }, []);

  return (
    <div className="container">
      {/* { */}
      <div style={{visibility:isLoading ? "visible" : "hidden"}}>Loading ...</div>
      {
        isImage ? 
        <img className="image" style={{visibility:isLoading ? "hidden" : "visible"}} src={imageUrl} onLoad={() => {toggleIsLoading(false)}}/>
        :
        <video className="image" style={{visibility:isLoading ? "hidden" : "visible"}} src={imageUrl} onLoadStart={() => {toggleIsLoading(false)}} autoPlay/>
      }
      <br />
      <button className="button" onClick = {getImage}>Load new image</button>
    </div>
  );
}

export default App;
