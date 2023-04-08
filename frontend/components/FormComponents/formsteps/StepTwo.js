import React, { useState, useEffect } from 'react';
import DropdownIcon from '../../Icons/DropdownIcon';
import FormTimer from '../FormTimer';

const StepTwo = ({ handleClick, currentStep, steps }) => {
  const [uploadProofBtn, setUploadProofBtn] = useState();
  const [showDetails, setShowDetails] = useState();

  const handleShowRequest = () => {
    setShowDetails(!showDetails);
  };

  const handleUploadProofBtn = () => {
    setUploadProofBtn(!uploadProofBtn);
  };
  return (
    <>
      <div className="fade-in">
        {/* <div className='flex flex-col gap-3 px-4 pb-4'> */}
        {/* <div className='flex items-center justify-around gap-3 py-3'>
                    <div className='flex items-center gap-3'>
                        <span className='p-2 rounded-full bg-[#5B2D0B]  flex items-center justify-center w-8 h-8 text-white'>1</span>
                        <span className='text-[#5B2D0B]'>
                            Fulfill request
                        </span>
                        
                    </div>
                    <div className='flex items-center gap-3'>
                        <span className='p-2 rounded-full  flex items-center justify-center w-8 h-8 bg-[#DD7D37] border border-[#DD7D37] text-white'>2</span>
                        <span className='text-[#DD7D37] '>
                        Gather Plastics
                        </span>
                        
                    </div>
                    <div className='flex items-center gap-3'>
                        <span className='p-2 rounded-full bg-white  flex items-center justify-center w-8 h-8 text-gray-500 border border-gray-500'>3</span>
                        <span className='text-gray-500 '>
import DropdownIcon from '../../Icons/DropdownIcon';
                            Deliver Plastics
                        </span>
                        
                    </div>

                </div> */}
        <div className="py-4 px-3">
          <p className="text-sm text-[#DD7D37] font-semibold text-left">
            Once you've gathered enough plastics, click on “Complete Request” to
            signal that you're ready to deliver the plastic items in the dropoff
            center. Make sure to deliver before the expiry date!
          </p>
        </div>

        <FormTimer />

        {/* </div> */}

        <div className="px-6 py-6  border border-gray-300 rounded-lg">
          <div>
            <div className="grid grid-cols-2 gap-4 gap-y-9 py-3">
              <div className="flex-1 w-full col-span-2">
                <span className="text-gray-700 font-base mb-3">Location</span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                  Ikeja
                </div>
              </div>
              <div className="flex-1">
                <span className="text-gray-700 font-base mb-3">
                  Category of Scrap
                </span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                  Plastics
                </div>
              </div>
              <div className="flex-1">
                <span className="text-gray-700 font-base mb-3">
                  Type of Scrap
                </span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                  Polyethylene Terephthalate (PET)
                </div>
              </div>

              <div className="flex-1">
                <span className="text-gray-700 font-base mb-3">
                  Quantity Provided
                </span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center gap-3 text-sm">
                  15kg
                </div>
                <small className="text-xs font-thin">
                  This quantity updates as collectors deliver{' '}
                </small>
              </div>
              <div className="flex-1">
                <span className="text-gray-700 font-base mb-3">
                  Amount to be disbursed
                </span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                  $250
                </div>
              </div>
              <div className="flex-1 w-full col-span-2">
                <span className="text-gray-700 font-base mb-3">
                  Description
                </span>
                <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100   focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm h-24"></div>
              </div>

              <div className="flex-1 w-full col-span-2">
                <span className="text-gray-700 font-base mb-3">
                  Dropoff Center
                </span>
                <div className="w-full py-2 mt-2 text-[#6B7280] rounded-md  flex items-start text-sm gap-2">
                  <div>
                    <img src="/images/gps.svg" />
                  </div>
                  <span>9.0820° N, 8.6753° E</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center flex-col md:flex-row gap-4 mt-5 mx-auto w-full">
              <button
                className="px-9 py-3  border border-gray-300 bg-white text-gray-700  rounded-full w-full md:w-1/2 "
                onClick={() => handleClick()}
              >
                Cancel Request
              </button>
              <button
                className="px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-full md:w-1/2 "
                onClick={() => handleUploadProofBtn('next')}
              >
                Deliver Plastics
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal__box ${uploadProofBtn ? 'show' : ''}`}>
        <div
          className="modal__box-wrapper shadow-lg rounded-2xl"
          style={{ overflow: 'auto' }}
        >
          <div className="w-full flex items-center justify-end">
            <button
              className="  rounded-full border-2 border-gray-700   "
              onClick={handleUploadProofBtn}
            >
              <span className="pointer-events-none flex items-center p-1">
                <svg
                  className="h-4 w-4 "
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="currentColor"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </button>
          </div>

          {/* <div className="px-6 py-6  border border-gray-300 rounded-lg"> */}
          <div>
            {/* <div className="dropdown relative grow mb-4 w-full border-b pb-8 border-gray-300">
              <button
                className="w-full bg-gray-100 h-12 focus:outline-none active:outline-none  flex items-center justify-between border-0 border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                type="button"
                onClick={handleShowRequest}
              >
                <span className="pointer-events-none flex items-center gap-2 text-[#6B7280]">
                  Show Request Details
                </span>
                <span
                  className={`pointer-events-none transition duration-200  ease-linear `}
                >
                  <DropdownIcon showDetails={showDetails} />
                </span>
              </button>

              <div
                className={`absolute border bg-white cat-menu large-dropdown px-3 shadow-md rounded-md w-full h-40 max-w-full overflow-y-auto scrollbar-change fade-in z-10 ${
                  showDetails ? 'show' : ''
                }`}
              >
                <div className=" py-4 divide-y">
                  <button
                      className="flex items-center py-3 px-2 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full "
                      type="button"
                    >
                      <div className="flex items-center justify-center gap-2 pr-2">
                        <img src="/images/plastics.svg" className="h-8 w-8" />
                      </div>
                      <div className="flex grow flex-col justify-center items-start text-left">
                        <p className="text-gray-700 font-normal text-base">
                          Plastics
                        </p>
                      </div>
                    </button>
                </div>
              </div>
            </div> */}

            <div className="py-4">
              <div className="mb-4 pb-3">
                <h3 className="text-2xl">Delivery Details</h3>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <label className="text-gray-600 font-medium text-base">
                    How much Kg are you dropping off?
                  </label>
                </div>
                <div className=" relative grow mb-4 w-full">
                  <input
                    className="w-full bg-white h-12 focus:outline-none active:outline-none text-sm  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                    defaultValue="5kg"
                  />
                  <div className="flex items-center justify-start mt-1 text-sm text-[#878A90] gap-1">
                    <small className="text-sm">
                      You would receive{' '}
                      <span className="font-bold text-gray-700 text-base">
                        $70{' '}
                      </span>
                    </small>
                    <small className="text-xs">
                      {' '}
                      ---- EcoMarket would collect{' '}
                      <span className="font-bold text-gray-700">2%</span>
                    </small>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="">
                  <label
                    className="text-gray-600 text-base  font-medium"
                    htmlFor=""
                  >
                    Upload Proof (Compulsory)
                  </label>
                  <p className="text-sm text-[#878A90]">
                    Upload proof of delivery less than 3mb (see{' '}
                    <a className="underline">instructions</a>)
                  </p>
                </div>
                <div className="relative grow w-full">
                  <button
                    className=" bg-white focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease text-[#6D747D]"
                    type="button"
                  >
                    <span>
                      <svg
                        className="h-12 w-12"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.5 4.16675V15.8334"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M4.66406 10H16.3307"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <label className="text-gray-700 font-medium text-base">
                    Description
                  </label>
                </div>
                <div className=" relative grow mb-4 w-full h-full">
                  <textarea
                    className="w-full bg-white focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center flex-col  gap-4 mt-5 mx-auto w-full">
              <button
                className="px-9 py-3  border border-gray-300 bg-white text-gray-700  rounded-full w-full"
                onClick={() => handleUploadProofBtn()}
              >
                Cancel Request
              </button>
              <button
                className="px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full  w-full "
                onClick={() => handleClick('next')}
              >
                Upload Proof of Delivery
              </button>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default StepTwo;
