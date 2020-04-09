import React, { useState, useEffect } from 'react';
import './App.css';
import {activities} from './activitiesList';

const getRandomActivity = () => {
  const randomActivityIndex = Math.floor(Math.random() * activities.list.length);
  const activity = activities.list[randomActivityIndex];
  return activity;
};

const getActivityVideo = (activity) => {
  if (!activity) {
    return null;
  } 
  if (!activity.media || activity.media.length === 0) {
    return null;
  }
  return activity.media.filter((media) => {
    return media.type.name === 'video';
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

  const youtubeVideos = getActivityVideo(randomActivity);
  let youtubeVideoElement = null;
  if (youtubeVideos) {
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

  return (
    <div className="App">
      <h1>Hello</h1>
      <p>{randomActivity.title}</p>
      {youtubeVideoElement}
      <button onClick={onNextActivity}>Next activity</button>
    </div>
  );
}

export default App;
