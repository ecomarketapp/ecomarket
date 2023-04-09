import { useRouter } from 'next/router';
import React from 'react';

const ErrorPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
        <div className="flex items-center justify-center flex-col gap-4 w-full md:w-1/2 mx-auto">
          <img src="/images/file-not-found.svg" className="w-full h-full" />
          <p className="text-lg">
            Nothing here,{' '}
            <button onClick={() => router.back()}>click to go back.</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
