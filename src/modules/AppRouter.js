/*eslint-disable react/prop-types*/

import React from 'react';
import HomeViewContainer from './Home/HomeViewContainer';
import LiveWorkout from './LiveWorkout/LiveWorkoutViewContainer';
import History from './History/HistoryViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const key = props.scene.route.key;

  if (key === 'home') {
    return <HomeViewContainer />;
  }

  if (key === 'liveWorkout') {
    return <LiveWorkout />;
  }

  if (key === 'history') {
    return <History />;
  }

  throw new Error('Unknown navigation key: ' + key);
}
