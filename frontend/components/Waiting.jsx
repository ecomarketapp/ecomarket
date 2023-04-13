import React from 'react';

export default function Waiting() {
  return (
    <div className="h-full pb-24 px-4 md:px-12 py-12 flex mt-10 items-center justify-center">
      <div>
        <img src="/images/waiting.png" className="animate-spin" />
      </div>
    </div>
  );
}
