"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { individualSlidesData, slideVariants } from "@/app/lib/constants";

const ForIndividuals = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [direction, setDirection] = useState('right');
  // const totalSlidesLength = individualSlidesData.length;

  // const handleDotClick = (index) => {
  //   setDirection(index > currentIndex ? 'right' : 'left');
  //   setCurrentIndex(index);
  // };

  // Function to switch to the next slide automatically
  // const autoSwitchSlides = () => {
  //   const nextIndex = (currentIndex + 1) % totalSlidesLength;
  //   setDirection('right');
  //   setCurrentIndex(nextIndex);
  // };

  // useEffect(() => {
  //   const intervalId = setInterval(autoSwitchSlides, 10000);
  //   return () => clearInterval(intervalId); // Cleanup on component unmount
  // }, [currentIndex]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [manualInteraction, setManualInteraction] = useState(false);
  const [direction, setDirection] = useState("right");
  const totalSlidesLength = individualSlidesData.length;

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
    setManualInteraction(true);
  };

  // Function to switch to the next slide automatically
  const autoSwitchSlides = useCallback(() => {
    if (!manualInteraction) {
      const nextIndex = (currentIndex + 1) % totalSlidesLength;
      setDirection("right");
      setCurrentIndex(nextIndex);
    }
    setManualInteraction(false);
  }, [manualInteraction, currentIndex, totalSlidesLength]);

  useEffect(() => {
    const intervalId = setInterval(autoSwitchSlides, 10000);
    return () => clearInterval(intervalId);
  }, [currentIndex, manualInteraction, autoSwitchSlides]);

  return (
    <section className="bg-[#F9FDFB] py-20 features__section relative">
      <div className="w-full">
        <div className="py-5 container mx-auto px-6 md:px-12">
          <div className="mb-16 text-center max-w-2xl mx-auto ">
            <h1 className="text-center text-[26px] md:text-4xl font-bold mb-[22px] text-[#1A202B]">
              For Individuals
            </h1>
            <h3 className="text-sm md:text-xl font-normal text-center text[#3F3F3F]">
              EcoMarket makes recycling fun and rewarding. To get into the fun;
            </h3>
          </div>
          <div>
            <div className="flex flex-col-reverse items-start lg:flex-row-reverse lg:justify-between gap-12 lg:gap-20 text-white h-full">
              <div className=" w-full lg:w-[60%] flex flex-col justify-between h-full gap-6 ">
                <div className="flex flex-col gap-5 lg:gap-6 border-l-2 border-[#DBDDDC]">
                  {individualSlidesData.map((_, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`px-3 lg:px-6 cursor-pointer hover:opacity-100 relative before:transition-all before:ease-in before:absolute before:w-1 before:h-full before:top-0 before:-left-[2px] transition-all duration-200 ease-in hover:text-[#3F3F3F] ${
                        currentIndex === idx
                          ? "before:bg-[#12B76A] before:opacity-100 opacity-100 text-[#3F3F3F]"
                          : "text-[#95989B] "
                      }`}
                    >
                      <h3 className="text-sm md:text-xl lg:text-[22px] font-bold mb-1  transition-all duration-200 ease-in py-2 lg:py-4">
                        {_.title}
                      </h3>
                    </div>
                  ))}
                </div>

                <div className="w-full md:w-2/3 lg:w-full mx-auto mt-6 flex items-center justify-center md:justify-start">
                  <Link
                    href="/"
                    className=" bg-[#12B76A] text-white py-3 px-[22px] text-sm w-[221px] text-center rounded-3xl font-medium border border-[#12B76A] btn-3"
                  >
                    Drop off recyclable
                  </Link>
                </div>
              </div>
              <div className="flex justify-center items-center lg:items-start w-full lg:w-1/2 lg:h-[504px] overflow-hidden">
                <div className="flex items-start h-full">
                  <div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        variants={slideVariants}
                        initial={
                          direction === "right" ? "hiddenRight" : "hiddenLeft"
                        }
                        transition={{
                          repeat: Infinity,
                          duration: manualInteraction ? 15 : 5,
                        }}
                        animate="visible"
                        exit="exit"
                        className="w-full flex flex-col h-auto rounded-lg text-center shadow-lg"
                      >
                        {/* bg-black bg-opacity-10 border border-blue-faded  */}
                        <Image
                          src={individualSlidesData[currentIndex].image}
                          alt={individualSlidesData[currentIndex].title}
                          className="mx-auto object-cover rounded-lg"
                          height={400}
                          width={500}
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex gap-1 justify-center mt-4">
                      {individualSlidesData.map((_, idx) => (
                        <svg
                          key={idx}
                          onClick={() => handleDotClick(idx)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="7"
                          height="7"
                          viewBox="0 0 4 4"
                          fill="none"
                          className="cursor-pointer rounded-full"
                        >
                          <circle
                            cx="2"
                            cy="2"
                            r="2"
                            fill={currentIndex === idx ? "#12B76A" : "#EDEDED"}
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full absolute bottom-0 left-0 pointer-events-none">
        <Image
          src={"/images/Ellipse 84.png"}
          alt={"ecomarket"}
          fill
          // layout="responsive"
          // width={1200}
          // height={500}
          priority
          className={
            " flex items-center justify-center object-cover object-center w-full h-full "
          }
        />
      </div>
    </section>
  );
};

export default ForIndividuals;

// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useState } from 'react';

// const ForIndividuals = () => {
//   const [activeTab, setActiveTab] = useState(0);

//   const setTab = (number) => {
//     setActiveTab(number);
//   };

//   const tabImages = [
//     '/images/hands-holding-recyclable-items.png',
//     '/images/group-happy-african-volunteers.png',
//     '/images/recylce_garbage.png',
//     '/images/tracking-van.png',
//   ];
//   return (
//     <section className="bg-[#F9FDFB] py-20 features__section">
//       <div className="w-full">
//         <div className="py-5 container mx-auto px-6 md:px-12">
//           <div className="mb-16 text-center max-w-lg mx-auto ">
//             <h1 className="text-center text-4xl font-bold mb-[22px] text-[#1A202B]">
//               For Individuals
//             </h1>
//             <h3 className="text-sm font-normal text-center text[#3F3F3F]">
//               As a brand, going green doesn&apos;t have to be a hassle. Set up
//               transparent, circular recycling programs, customized to your
//               needs! 100% verifiable on the blockchain
//             </h3>
//           </div>
//           <div>
//             <div className="flex flex-col items-center lg:flex-row-reverse lg:justify-between gap-16 lg:gap-20 mb-14 text-white">
//               <div className="flex justify-center items-center lg:items-start w-full lg:w-1/2 lg:h-[504px] animate__animated animate__tada wow">
//                 {/* animated_img */}
//                 <Image
//                   alt="image"
//                   fetchPriority="high"
//                   width="697"
//                   height="604"
//                   decoding="async"
//                   data-nimg="1"
//                   className="w-full  fade-in object-cover"
//                   src={tabImages[activeTab]}
//                 />
//               </div>
//               <div className="flex flex-col gap-5 lg:gap-8 w-full lg:w-[60%] border-l-2 border-[#DBDDDC]">
//                 <div
//                   className={`px-3 lg:px-8 cursor-pointer hover:opacity-100 relative before:transition-all before:ease-in before:absolute before:w-1 before:h-full before:top-0 before:-left-[2px] transition-all duration-200 ease-in hover:text-[#3F3F3F] ${
//                     activeTab === 0
//                       ? 'before:bg-[#12B76A] before:opacity-100 opacity-100 text-[#3F3F3F]'
//                       : 'text-[#95989B] '
//                   }`}
//                   onClick={() => setTab(0)}
//                 >
//                   <h3 className="text-sm md:text-xl lg:text-2xl font-bold mb-1  transition-all duration-200 ease-in">
//                     Set up profile
//                   </h3>
//                 </div>
//                 <div
//                   className={`px-3 lg:px-8 cursor-pointer hover:opacity-100 relative before:transition-all before:ease-in before:absolute before:w-1 before:h-full before:top-0 before:-left-[2px] transition-all duration-200 ease-in hover:text-[#3F3F3F] ${
//                     activeTab === 1
//                       ? 'before:bg-[#12B76A] before:opacity-100 opacity-100 text-[#3F3F3F]'
//                       : 'text-[#95989B]'
//                   }`}
//                   onClick={() => setTab(1)}
//                 >
//                   <h3 className=" text-sm md:text-xl lg:text-2xl font-bold mb-1 transition-all duration-200 ease-in">
//                     Get alerts with new requests for recyclables in your
//                     location.
//                   </h3>
//                 </div>
//                 <div
//                   className={`px-3 lg:px-8 cursor-pointer hover:opacity-100 relative before:transition-all before:ease-in before:absolute before:w-1 before:h-full before:top-0 before:-left-[2px] transition-all duration-200 ease-in hover:text-[#3F3F3F] ${
//                     activeTab === 2
//                       ? 'before:bg-[#12B76A] before:opacity-100 opacity-100 text-[#3F3F3F]'
//                       : 'text-[#95989B]'
//                   }`}
//                   onClick={() => setTab(2)}
//                 >
//                   <h3 className=" text-sm md:text-xl lg:text-2xl font-bold mb-1 transition-all duration-200 ease-in">
//                     Drop off recyclable or request for pickup
//                   </h3>
//                 </div>
//                 <div
//                   className={`px-3 lg:px-8 cursor-pointer hover:opacity-100 relative before:transition-all before:ease-in before:absolute before:w-1 before:h-full before:top-0 before:-left-[2px] transition-all duration-200 ease-in hover:text-[#3F3F3F] ${
//                     activeTab === 3
//                       ? 'before:bg-[#12B76A] before:opacity-100 opacity-100 text-[#3F3F3F] '
//                       : 'text-[#95989B]'
//                   }`}
//                   onClick={() => setTab(3)}
//                 >
//                   <h3 className=" text-sm md:text-xl lg:text-2xl font-bold mb-1 transition-all duration-200 ease-in">
//                     Get rewarded with coupons, vouchers or even cash!
//                   </h3>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full md:w-2/3 lg:w-full mx-auto">
//               <Link className="w-full lg:w-[initial]" href="/">
//                 <button className="bg-[#12B76A] text-white py-3 px-[22px] text-sm w-full lg:w-[221px] rounded-3xl font-medium border border-[#12B76A] btn-3">
//                   Drop off Recycle
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ForIndividuals;
