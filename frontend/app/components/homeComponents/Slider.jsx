'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { onboardingSlidesData, slideVariants } from '@/app/lib/constants';

const Slider = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const totalSlidesLength = onboardingSlidesData.length;

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  return (
    <div className="relative overflow-x-hidden">
      <div className="flex gap-1 justify-center mb-4">
        {onboardingSlidesData.map((_, idx) => (
          <svg
            key={idx}
            onClick={() => handleDotClick(idx)}
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="4"
            viewBox="0 0 4 4"
            fill="none"
            className="cursor-pointer"
          >
            <circle
              cx="2"
              cy="2"
              r="2"
              fill={currentIndex === idx ? '#9775F1' : 'white'}
            />
          </svg>
        ))}
      </div>

      <div className="max-w-sm px-4 mt-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial={direction === 'right' ? 'hiddenRight' : 'hiddenLeft'}
            animate="visible"
            exit="exit"
            className="w-full px-6 py-8 flex flex-col h-[300px] mb-40 gap-8 bg-black bg-opacity-10 border border-blue-faded rounded-lg text-center"
          >
            <div className="">
              <h2 className="text-base text-white font-semibold">
                {onboardingSlidesData[currentIndex].title}
              </h2>
            </div>
            <p className="text-white text-opacity-70 text-sm">
              {onboardingSlidesData[currentIndex].subtitle}
            </p>
            <Image
              src={onboardingSlidesData[currentIndex].image}
              alt={onboardingSlidesData[currentIndex].title}
              className="mt-5 mx-auto -mb-72 object-cover"
              height={250}
              width={250}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6">
        {/* <button
          onClick={handleNext}
          className="bg-[#0294E2] font-semibold rounded-lg p-2.5 w-full h-12 block text-center text-white"
        >
          {currentIndex === totalSlidesLength - 1 ? 'Proceed' : 'Next'}
        </button> */}

        <div className="flex gap-1 justify-center mb-4">
          {onboardingSlidesData.map((_, idx) => (
            // <svg
            //   key={idx}
            //   onClick={() => handleDotClick(idx)}
            //   xmlns="http://www.w3.org/2000/svg"
            //   width="4"
            //   height="4"
            //   viewBox="0 0 4 4"
            //   fill="none"
            //   className="cursor-pointer"
            // >
            //   <circle
            //     cx="2"
            //     cy="2"
            //     r="2"
            //     fill={currentIndex === idx ? '#9775F1' : 'white'}
            //   />
            // </svg>
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className="bg-[#0294E2] font-semibold rounded-lg p-2.5 w-full h-12 block text-center text-white"
            >
              {_.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
