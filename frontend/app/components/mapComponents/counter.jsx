'use client';
import React from 'react';
import CountUp, { useCountUp } from 'react-countup';

const Counter = ({ number, ref }) => {
  useCountUp({
    ref: { ref },
    end: { number },
    enableScrollSpy: true,
    scrollSpyDelay: 1000,
  });

  return <CountUp end={number} enableScrollSpy />;
};

export default Counter;
