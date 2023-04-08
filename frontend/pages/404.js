import React from 'react';

const ErrorPage = () => {
  return (
    <div>
      <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
        <div className="flex items-center justify-center flex-col gap-4">
          <img src="/images/file-not-found.svg" />
          <p>Nothing here, go back.</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
