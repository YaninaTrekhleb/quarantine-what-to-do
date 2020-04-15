import React, { useState, useEffect } from 'react';
import './App.css';

import { mediaTypes } from './activitiesList';
import { getRandomActivity, getActivityMediaOfType, totalActivitiesNum } from './utilities';

const mediaWidth = "600";

function App() {
  const [randomActivity, setRandomActivity] = useState(null);

  useEffect(() => {
    const activity = getRandomActivity();
    setRandomActivity(activity);
  }, []);
  
  const onNextActivity = () => {
    const activity = getRandomActivity();
    setRandomActivity(activity);
  };

  if (!randomActivity) {
    return (<div>Loading...</div>);
  }

  const youtubeVideos = getActivityMediaOfType(randomActivity, mediaTypes.video.name);
  let youtubeVideoElement = null;
  if (youtubeVideos && youtubeVideos.length) {
    youtubeVideoElement = (
      <div className="media-video-container">
        <iframe
          width="500"
          height="315"
          src={youtubeVideos[0].link}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      </div>
    );
  };

  const images = getActivityMediaOfType(randomActivity, mediaTypes.image.name);
  let imageElement = null;
  if (images && images.length) {
    const originLinkElement = images[0].origin ? (
      <a href={images[0].origin} target="_blank" className="text-muted"><small>Image Source</small></a>
    ) : null;
    imageElement = (
      <div className="media-image-container d-flex flex-column justify-content-center">
        <div className="justify-content-center text-center">
          <img
            src={images[0].link}
            width={mediaWidth}
          />
        </div>
        <div className="d-flex justify-content-center">
          {originLinkElement}
        </div>
      </div>
    );
  }

  const links = getActivityMediaOfType(randomActivity, mediaTypes.link.name);
  let linkElement = null;
  if (links && links.length) {
    const linkImageElement = links[0].image ? (
      <img
        src={links[0].image}
        width={mediaWidth}
      />
    ) : null;
    const originLinkElement = links[0].origin ? (
      <a href={links[0].origin} target="_blank" className="text-muted"><small>Image Source</small></a>
    ) : null;
    linkElement = (
      <div className="media-link-container d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-center game-links mb-3">
          <a href={links[0].link} target="_blank">
            {links[0].text}
          </a>
        </div>
        <div className="justify-content-center text-center">
          {linkImageElement}
        </div>
        <div className="d-flex justify-content-center">
          {originLinkElement}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="text-center mt-5 mb-4">{totalActivitiesNum} things to do on quarantine</h1>
      <h2 className="text-center mb-2">{randomActivity.title}</h2>
      <div className="d-flex justify-content-center mb-4">
        <button onClick={onNextActivity} className="btn btn-info btn-lg button-style">Next activity</button>
      </div>
      <div className="mb-3">
        {youtubeVideoElement}
        {imageElement}
        {linkElement}
      </div>
    </div>
  );
}

export default App;
