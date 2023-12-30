import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TronCTA = () => {
  return (
    <div className="px-4 py-12 ">
      <div className="bg-[#022113] max-w-7xl px-4 space-y-3 container mx-auto  py-14 rounded-lg text-center relative animate__animated wow animate__fadeInUp cta__box_shadow max-h-[400px] h-[300px]">
        <div className="h-full relative max-w-2xl px-3  text-center lg:text-left">
          <div className="flex items-center lg:items-start justify-center flex-col h-full gap-4">
            <h3 className="text-4xl text-white font-medium ">
              Winner of TRON Hackathon 2023
            </h3>
            <p className="text-lg text-white font-medium">
              Ecomarket was recognized by TRON as a promising application for
              waste management in Africa.
            </p>
            <div className="mt-3">
              <Link href="/" className=" text-base  text-white border border-[#12B76A] rounded-full px-8 py-3 text-center">
                {/* <span className=" text-base "> */}
                  Read More
                {/* </span> */}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 h-full w-[600px] pointer-events-none mx-auto flex items-center opacity-40 lg:opacity-100">
          <Image
            src="/images/image 1 (4).png"
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
