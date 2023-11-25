'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import Counter from './counter';

const Map = () => {
  const element1Position = { top: '-25%', left: '40%' };
  const element2Position = { top: '-15%', left: '20%' };
  const element3Position = { top: '-10%', left: '75%' };

  const counterRef1 = useRef();
  const counterRef2 = useRef();
  const counterRef3 = useRef();
  return (
    <section className="bg-[#F9FDFB] py-12">
      <div className="py-12 container mx-auto px-4">
        <div className="mb-16 text-left lg:text-center max-w-lg mx-auto ">
          <span className="mb-3">Our Impact</span>
          <h1 className="text-4xl font-bold mb-[22px] text-[#1A202B]">
            We&apos;re only just getting started on our journey
          </h1>
        </div>

        <div className="flex items-center justify-center px-3 py-40">
          <div className="relative">
            <Image src="/images/map.svg" alt="map" width={600} height={500} />
            <div
              className="counter tonne flex items-center flex-col justify-center absolute map_animated_text before:transition-all before:ease-in before:absolute before:w-[0.25px] before:h-[100px] before:md:h-[150px] before:lg:h-[200px] before:top-[7.5rem] before:left-[50%] before:rotate-180 before:bg-[#12B76A] "
              style={{ top: element2Position.top, left: element2Position.left }}
            >
              <Counter number={10} ref={counterRef1} />
              <span className="sub_text text-[#1A202B] text-sm">tonnes</span>
            </div>

            <div
              className="counter individual flex items-center flex-col justify-center absolute map_animated_text before:transition-all before:ease-in before:absolute before:w-[0.25px] before:h-[70px] before:md:h-[150px] before:lg:h-[200px] before:top-[7.5rem] before:left-[50%] before:rotate-180 before:bg-[#12B76A]"
              style={{ top: element1Position.top, left: element1Position.left }}
            >
              <div className="inline-flex items-center">
                <span>$</span>
                <span className=" inline-flex items-center">
                  <Counter number={2} ref={counterRef2} />K
                </span>
                <span>+</span>
              </div>
              <div className="sub_text text-[#1A202B] text-sm">in rewards</div>
            </div>

            <div
              className="counter rewards flex items-center flex-col justify-center absolute map_animated_text before:transition-all before:ease-in before:absolute before:w-[0.25px] before:h-[110px] before:md:h-[150px] before:lg:h-[170px] before:top-[7.5rem] before:left-[50%] before:rotate-180 before:bg-[#12B76A]"
              style={{ top: element3Position.top, left: element3Position.left }}
            >
              <div className=" inline-flex items-center">
                <Counter number={10} ref={counterRef3} />
                <span>K</span>
              </div>
              <div className="sub_text text-[#1A202B] text-sm">
                Individuals donated
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
