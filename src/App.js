import React, { useState, useEffect } from 'react';
import './App.css';
import {activities, mediaTypes} from './activitiesList';

const getRandomActivity = () => {
  const randomActivityIndex = Math.floor(Math.random() * activities.list.length);
  const activity = activities.list[randomActivityIndex];
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
        width="560" 
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
    imageElement = (
      <img 
        src={images[0].link}
        width="400" 
      />
    );
  }

  const links = getActivityMediaOfType(randomActivity, mediaTypes.link.name);
  let linkElement = null;
  if (links && links.length) {
    linkElement = (
      <a href={links[0].link}>
        {links[0].text}
      </a>
    );
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <p>{randomActivity.title}</p>
      <div>
        {youtubeVideoElement}
        {imageElement}
        {linkElement}
      </div>
      <button onClick={onNextActivity}>Next activity</button>
    </div>
  );
}

export default App;
