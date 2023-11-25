// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useState } from 'react';

// const ForBusiness = () => {
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
//     <section className="bg-[#02351D] py-20 features__section">
//       <div className="w-full">
//         <div className="py-5 container mx-auto px-6 md:px-12">
//           <div className="mb-16 text-center max-w-lg mx-auto text-white">
//             <h1 className="text-center text-4xl font-bold mb-[22px]">
//               For Business
//             </h1>
//             <h3 className="text-sm font-normal text-center">
//               As a brand, going green doesn&apos;t have to be a hassle. Set up
//               transparent, circular recycling programs, customized to your
//               needs! 100% verifiable on the blockchain
//             </h3>
//           </div>
//           <div>
//             <div className="flex flex-col items-center lg:flex-row-reverse lg:justify-between gap-16 lg:gap-20 mb-14 text-white">
//               <div className="flex justify-center items-center lg:items-start w-full lg:w-1/2 lg:h-[504px] animated_img relative">
//                 <Image
//                   alt="image"
//                   fetchPriority="high"
//                   width="697"
//                   height="604"
//                   // layout='fill'
//                   decoding="async"
//                   data-nimg="1"
//                   className=" w-full h-full object-contain object-center"
//                   src={tabImages[activeTab]}
//                 />
//               </div>
//               <div className="flex flex-col gap-5 lg:gap-8 w-full lg:w-[60%] border-l-2 border-[#898989]">
//                 <div
//                   className={`px-3 lg:px-8 cursor-pointer hover:opacity-100 relative before:transition-all before:ease-in before:absolute before:w-1 before:h-full before:top-0 before:-left-[2px] transition-all duration-200 ease-in ${
//                     activeTab === 0
//                       ? 'before:bg-[#C6FFE4] before:opacity-100 opacity-100 text-white'
//                       : 'text-[#95989B] '
//                   }`}
//                   onClick={() => setTab(0)}
//                 >
//                   <h3 className="text-sm md:text-xl lg:text-2xl font-bold mb-1 hover:text-white transition-all duration-200 ease-in">
//                     Get onboarded
//                   </h3>
//                 </div>
//                 <div
//                   className={`px-3 lg:px-8 cursor-pointer hover:opacity-100 relative before:transition-all before:ease-in before:absolute before:w-1 before:h-full before:top-0 before:-left-[2px] transition-all duration-200 ease-in ${
//                     activeTab === 1
//                       ? 'before:bg-[#C6FFE4] before:opacity-100 opacity-100 text-white'
//                       : 'text-[#95989B]'
//                   }`}
//                   onClick={() => setTab(1)}
//                 >
//                   <h3 className=" text-sm md:text-xl lg:text-2xl font-bold mb-1 hover:text-white transition-all duration-200 ease-in">
//                     Integrate reward system (coupons, vouchers or cash) via our
//                     APIs
//                   </h3>
//                 </div>
//                 <div className={`px-3 lg:px-8 cursor-pointer hover:opacity-100 relative before:transition-all before:ease-in before:absolute before:w-1 before:h-full before:top-0 before:-left-[2px] transition-all duration-200 ease-in ${
//                     activeTab === 2
//                       ? 'before:bg-[#C6FFE4] before:opacity-100 opacity-100 text-white'
//                       : 'text-[#95989B]'
//                   }`}
//                   onClick={() => setTab(2)}>
//                   <h3 className=" text-sm md:text-xl lg:text-2xl font-bold mb-1 hover:text-white transition-all duration-200 ease-in">
//                     Make request for recyclables and specify your requirements.
//                   </h3>
//                 </div>
//                 <div className={`px-3 lg:px-8 cursor-pointer hover:opacity-100 relative before:transition-all before:ease-in before:absolute before:w-1 before:h-full before:top-0 before:-left-[2px] transition-all duration-200 ease-in ${
//                     activeTab === 3
//                       ? 'before:bg-[#C6FFE4] before:opacity-100 opacity-100 text-white '
//                       : 'text-[#95989B]'
//                   }`}
//                   onClick={() => setTab(3)}>
//                   <h3 className=" text-sm md:text-xl lg:text-2xl font-bold mb-1 hover:text-white transition-all duration-200 ease-in">
//                     Track drop offs and process rewards automatically.
//                   </h3>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full md:w-2/3 lg:w-full mx-auto">
//               <div className="w-full lg:w-[initial]" >
//                 <Link className="bg-[#12B76A] text-white py-3 px-[22px] text-sm w-full lg:w-[221px] rounded-3xl font-medium border border-[#12B76A] btn-3" href="">
//                   Make request
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ForBusiness;

'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { businessSlidesData, slideVariants } from '@/app/lib/constants';

const ForBusiness = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [manualInteraction, setManualInteraction] = useState(false);
  const [direction, setDirection] = useState('right');
  const totalSlidesLength = businessSlidesData.length;

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
    setManualInteraction(true);
  };

  // Function to switch to the next slide automatically
  const autoSwitchSlides = () => {
    if (!manualInteraction) {
      const nextIndex = (currentIndex + 1) % totalSlidesLength;
      setDirection('right');
      setCurrentIndex(nextIndex);
    }
    setManualInteraction(false);
  };

  useEffect(() => {
    const intervalId = setInterval(autoSwitchSlides, 10000);
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [currentIndex, manualInteraction]);

  return (
    <section className="bg-[#02351D] py-20 features__section">
      <div className="w-full">
        <div className="py-5 container mx-auto px-6 md:px-12">
          <div className="mb-16 text-center max-w-lg mx-auto text-white">
            <h1 className="text-center text-4xl font-bold mb-[22px]">
              For Business
            </h1>
            <h3 className="text-sm font-normal text-center">
              As a brand, going green doesn&apos;t have to be a hassle. Set up
              transparent, circular recycling programs, customized to your
              needs! 100% verifiable on the blockchain
            </h3>
          </div>
          <div>
            <div className="flex flex-col items-center lg:flex-row-reverse lg:justify-between gap-12 lg:gap-20 mb-14 text-white">
              <div className="flex justify-center items-center lg:items-start w-full lg:w-1/2 lg:h-[504px] overflow-hidden">
                <div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      variants={slideVariants}
                      initial={
                        direction === 'right' ? 'hiddenRight' : 'hiddenLeft'
                      }
                      animate="visible"
                      exit="exit"
                      transition={{
                        repeat: Infinity,
                        duration: manualInteraction ? 15 : 5,
                      }}
                      className="w-full flex flex-col h-auto bg-[#02351D] bg-opacity-10 border border-[#898989] rounded-lg text-center px-1 py-1 shadow-lg"
                    >
                      <Image
                        src={businessSlidesData[currentIndex].image}
                        alt={businessSlidesData[currentIndex].title}
                        className="mx-auto object-cover rounded-lg"
                        height={400}
                        width={500}
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex gap-1 justify-center mt-4">
                    {businessSlidesData.map((_, idx) => (
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
                          fill={currentIndex === idx ? '#12B76A' : '#EDEDED'}
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 lg:gap-6 w-full lg:w-[60%] border-l-2 border-[#898989]">
                {businessSlidesData.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`px-3 lg:px-8 cursor-pointer hover:opacity-100 relative before:transition-all before:ease-in before:absolute before:w-1 before:h-full before:top-0 before:-left-[2px] transition-all duration-200 ease-in hover:text-white ${
                      currentIndex === idx
                        ? 'before:bg-[#C6FFE4] before:opacity-100 opacity-100 text-white'
                        : 'text-[#95989B] '
                    }`}
                  >
                    <h3 className="text-sm md:text-xl lg:text-2xl font-bold mb-1  transition-all duration-200 ease-in">
                      {_.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/3 lg:w-full mx-auto">
              <Link className="w-full lg:w-[initial]" href="/">
                <button className="bg-[#12B76A] text-white py-3 px-[22px] text-sm w-full lg:w-[221px] rounded-3xl font-medium border border-[#12B76A] btn-3">
                  Make Request
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForBusiness;
