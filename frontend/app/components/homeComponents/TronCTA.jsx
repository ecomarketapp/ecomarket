import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TronCTA = () => {
  return (
    <div className="px-4 py-12 ">
      <div className="bg-[#022113] max-w-[960px] px-4 space-y-3 container mx-auto  py-14 rounded-lg text-center relative animate__animated wow animate__fadeInUp cta__box_shadow max-h-[400px] h-[300px]">
        <div className="h-full relative">
          <div className="flex items-center justify-center flex-col gap-4 h-full">
            <h3 className="text-4xl text-white font-medium">
              Winner of TRON Hackathon 2023
            </h3>
            <div className="">
              <Link href="/" className=" px-5 text-base  text-white underline">
                <span className=" text-base ">Winner of TRON Hackathon 2023</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[0px] left-0 right-0 h-[200px] w-[250px] pointer-events-none mx-auto flex items-center">
          <Image
            src="/images/image22.svg"
            fill
            className="pointer-events-none object-cover "
            alt="bg-image"
            loading={'lazy'}
          />
        </div>
      </div>
    </div>
  );
};

export default TronCTA;
