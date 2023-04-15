import React from 'react';
import { useState } from 'react';
import DropdownIcon from '../../Icons/DropdownIcon';
import FormTimer from '../FormTimer';

const StepApprove = ({ handleClick, currentStep, steps, data, quantity }) => {
  console.log(data, 'A')
  return (
    <div>
      <div className="fade-in">
        {/* <div className='flex items-center justify-around gap-3 py-3'>
                    <div className='flex items-center gap-3'>
                        <span className='p-2 rounded-full bg-[#DD7D37]  flex items-center justify-center w-8 h-8 text-white border border-[#DD7D37]'>1</span>
                        <span className='text-[#DD7D37]'>
                            Fulfill request
                        </span>
                        
                    </div>
                    <div className='flex items-center gap-3'>
                        <span className='p-2 rounded-full bg-white  flex items-center justify-center w-8 h-8 text-gray-500 border border-gray-500'>2</span>
                        <span className='text-gray-500 '>
                        Gather Plastics
                        </span>
                        
                    </div>
                    <div className='flex items-center gap-3'>
                        <span className='p-2 rounded-full bg-white  flex items-center justify-center w-8 h-8 text-gray-500 border border-gray-500'>3</span>
                        <span className='text-gray-500 '>
                            Deliver Plastics
                        </span>
                        
                    </div>

                </div> */}
        <div className="py-4 px-3">
          <p className="text-sm text-[#DD7D37] font-semibold text-left">
            By clicking on “Fulfill Request”, you confirm that you can fulfill
            some or all of the quantity required for this request before its
            expiry date. Once you've clicked on Fulfill Request, you can proceed
            to start gathering plastics.
          </p>
        </div>

        <FormTimer />

        <div className="px-6 py-6  border border-gray-300 rounded-lg">
          <div>
            <div className="grid grid-cols-2 gap-4 gap-y-9 py-3">
              <div className="flex-1 w-full col-span-2">
                <span className="text-gray-700 font-base mb-3">Location</span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                  {data ? data.location?.name : ''}
                </div>
              </div>
              <div className="flex-1">
                <span className="text-gray-700 font-base mb-3">
                  Category of Scrap
                </span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                  {data && data.scrap_category?.name}
                </div>
              </div>
              <div className="flex-1">
                <span className="text-gray-700 font-base mb-3">
                  Type of Scrap
                </span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                  {data && data.scrap_subcategory?.name}

                  {/* Polyethylene Terephthalate (PET) */}
                </div>
              </div>

              <div className="flex-1">
                <span className="text-gray-700 font-base mb-3">
                  Delivery Size
                </span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center gap-3 text-sm">
                  {quantity}
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
                  {data.amount_per_unit * quantity} TRX
                </div>
              </div>
              <div className="flex-1 w-full col-span-2">
                <span className="text-gray-700 font-base mb-3">
                  Description
                </span>
                <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100   focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm h-24">
                  {data && data.description}
                </div>
              </div>

              <div className="flex-1 w-full col-span-2">
                <span className="text-gray-700 font-base mb-3">
                  Dropoff Center
                </span>
                <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100   focus:border-gray-300 rounded-md focus:outline-none flex items-start text-sm h-24">
                  <span> {data && data?.collection_center?.title} </span>
                </div>
              </div>
              {/* <div className="flex-1 w-full col-span-2">
                            <span className="text-gray-700 font-base mb-3">Image</span>
                            <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100  border border-[#D1D5DB] border-dashed focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                <div className='flex items-center justify-between w-full'>

                                
                                    <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                        <div className='p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center border-4 border-[#FEF8F3]'>
                                            <img src="/images/Icon.png" alt="" />
                                        </div>
                                        <div className="flex gap-1 flex-col items-start w-full">
                                            <p className="text-base  text-[#344054] font-normal"> 10kg 0f PET Bottles</p>
                                            <p className="text-sm  text-[#667085] font-normal">720KB</p>
                                        </div>
                                    </div>

                                    <div>
                                        <button className='text-[#DD7D37] text-base'>Download</button>
                                    </div>

                                </div>
                            </div>
                            
                        </div> */}
            </div>

            <div className="flex items-center justify-center flex-col md:flex-row gap-4 mt-5 mx-auto w-full">
              <button
                className="px-9 py-3  border border-gray-300 bg-white text-gray-700  rounded-full w-full  md:w-1/2"
                onClick={() => handleClick()}
              >
                Cancel Request
              </button>
              <button
                className="px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full  w-full md:w-1/2 "
                onClick={() => handleClick('next')}
              >
                Gather Plastics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepApprove;
