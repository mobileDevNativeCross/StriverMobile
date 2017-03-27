/*eslint-disable react/prop-types*/

import React from 'react';
import CounterViewContainer from './counter/CounterViewContainer';
import BeginWorkout from './BeginWorkout/BeginWorkoutViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const key = props.scene.route.key;

  if (key === 'Counter') {
    return <CounterViewContainer />;
  }

  if (key === 'beginWorkout') {
    return <BeginWorkout />;
  }

  throw new Error('Unknown navigation key: ' + key);
}
