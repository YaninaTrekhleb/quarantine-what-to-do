import React, { useState, useEffect } from 'react';
import './App.css';
import {activities, mediaTypes} from './activitiesList';

const getRandomActivity = () => {
  const randomActivityIndex = Math.floor(Math.random() * activities.list.length);
  const activity = activities.list[randomActivityIndex];
  // const activity = activities.list[45]; // debuggind
  return activity;
};

// Getting media of specific type for specified activity.
const getActivityMediaOfType = (activity, mediaTypeKey) => {
  if (!activity) {
    return null;
  } 
  if (!activity.media || activity.media.length === 0) {
    return null;
  }
  return activity.media.filter((media) => {
    return media.type.name === mediaTypeKey;
  });
};

const mediaWidth = 600;

function App() {
  const [randomActivity, setRandomActivity] = useState(null);

  const onNextActivity = () => {
    const activity = getRandomActivity();
    setRandomActivity(activity);
  };

  useEffect(() => {
    const activity = getRandomActivity();
    setRandomActivity(activity);
  }, []);

  if (!randomActivity) {
    return (<div>Loading...</div>);
  }

  const youtubeVideos = getActivityMediaOfType(randomActivity, mediaTypes.video.name);
  let youtubeVideoElement = null;
  if (youtubeVideos && youtubeVideos.length) {
    youtubeVideoElement = (
      <iframe 
        width={mediaWidth}
        height="315" 
        src={youtubeVideos[0].link} 
        frameBorder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
      </iframe>
    );
  };

  const images = getActivityMediaOfType(randomActivity, mediaTypes.image.name);
  let imageElement = null;
  if (images && images.length) {
    const originLinkElement = images[0].origin ? (
      <a href={images[0].origin} target="_blank">Image Source</a>
    ) : null;
    imageElement = (
      <div className="media-images-container">
        <div>
          <img 
            src={images[0].link}
            width={mediaWidth} 
          />
        </div>
        <div>
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
      <div>
        <div>
          <a href={links[0].link}>
            {links[0].text}
          </a>
        </div>
        <div>
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
      <h1>Hello</h1>
      <div className="d-flex justify-content-center mb-3">
        <button onClick={onNextActivity} className="btn btn-info">Next activity</button>
      </div>
      <p>{randomActivity.title}</p>
      <div className="mb-3">
        {youtubeVideoElement}
        {imageElement}
        {linkElement}
      </div>
    </div>
  );
}

export default App;
