import {
  activities
} from './activitiesList';

const getRandomActivity = () => {
  const randomActivityIndex = Math.floor(Math.random() * activities.list.length);
  const activity = activities.list[randomActivityIndex];
  // const activity = activities.list.find(
  //   (act) => {
  //     return act.title === 'Draw a picture with pencils';
  //   }
  // );
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

const totalActivitiesNum = activities.list.length;

export {
  getRandomActivity,
  getActivityMediaOfType,
  totalActivitiesNum
}