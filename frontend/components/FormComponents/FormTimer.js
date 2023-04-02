import React from 'react';

const FormTimer = () => {
  return (
    <div className="flex items-center justify-start py-4 gap-2">
      <div className="flex items-center justify-start gap-1">
        <img src="/images/Clock.svg" />
        <span className="text-sm">Time left to fulfill requests</span>
      </div>
      <span className="text-2xl font-semibold ">48hrs:59mins:32secs</span>
    </div>
  );
};

export default FormTimer;
