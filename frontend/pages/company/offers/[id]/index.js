import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CompanyLayout from '../../../../components/CompanyLayout/Layout';
import DropdownIcon from '../../../../components/Icons/DropdownIcon';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import backend from '../../../../components/services/backend';
import { formatLocation } from '../../../../utils/other';
import Head from 'next/head';

const SingleOffer = ({ id }) => {
  const [createDispute, setCreateDispute] = useState();
  const [requestSuccessModal, setRequestSuccessModal] = useState();
  const [request, setRequest] = useState({});

  const handleDispute = () => {
    setCreateDispute(!createDispute);
  };
  const submitDispute = () => {
    setCreateDispute(false);
    setRequestSuccessModal(!requestSuccessModal);
  };

  const loadSingleRequest = () => {
    backend
      .getRequest(id)
      .then((request) => {
        setRequest(request);
        console.log(request);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(loadSingleRequest, [id]);

  return (
    <>
      <Head>
        <title>Ecomarket | Offer - {request.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`Ecomarket Company Offer ${request.title}`} />
      </Head>
      <CompanyLayout>
        <section>
          <div className="container mx-auto px-6">
            <div className="h-full pb-24 md:px-4 py-12">
              <div className="flex items-center py-6 mb-8 flex-col lg:flex-row border-b border-gray-300">
                <div className="flex-1 w-full flex-col items-start">
                  <h3 className="h2">{request.title}</h3>
                  <p>
                    {formatLocation(
                      request.location?.name,
                      request.location?.state
                    )}
                  </p>
                </div>

                <div className="mt-1 relative rounded-full flex-1  items-center grow flex w-full ">
                  {/* <div className='h-15 grow'>
                                    <progress className="progress w-full" value="40" max="100"></progress>
                                </div> */}

                  <div className="rounded-full w-full bg-gray-200 h-2">
                    <div
                      className="bg-[#DD7D37] h-2 rounded-full wrapper relative "
                      style={{ width: '55%' }}
                    >
                      {/* <span className="tooltipper text-[10px]">Blockchain explorer</span> */}
                    </div>
                  </div>

                  <div className="h-12 w-12">
                    <img
                      src="/images/plastics.svg "
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="">
                <div className="py-2 ">
                  {/* <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl mb-2">120kg of PET Bottles</h2>

                      <p className="font-thin text-[#667085]">Ikeja, Lagos</p>
                    </div>

                    <div>
                      <div
                        className="radial-progress text-sm text-center text-[#DD7D37]"
                        style={{ '--value': 25, '--size': '5rem' }}
                      >
                        <span className="text-[#6D747D]">
                          <span className="font-semibold text-[#3D4044]">
                            25% <br />
                          </span>{' '}
                          provided
                        </span>
                      </div>
                    </div>
                  </div> */}
                  <div>
                    {/* flex items-center justify-between w-full */}
                    <div className="grid grid-cols-2 gap-4 gap-y-12 py-3">
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
                          Date Created
                        </span>
                        <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center gap-3 text-sm">
                          <span className="text-xs">12:32pm</span>{' '}
                          <span>20/10/2022</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-700 font-base mb-3">
                          Expiry Date
                        </span>
                        <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                          30/10/2022
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-700 font-base mb-3">
                          Amount Paid
                        </span>
                        <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm justify-between">
                          $7,500
                          <span className="text-xs">1kg = $50</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-700 font-base mb-3">
                          Days Left
                        </span>
                        <div className="w-full h-12 px-4 py-2 mt-2 text-[#12B76A]   border-0 border-gray-200  rounded-md flex items-center text-sm">
                          10d : 24h : 15m : 32s
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 pb-3 mt-9">
                    <div className="mb-4">
                      <h3 className="text-lg">Dropoffs</h3>
                    </div>
                    <div className="grid grids-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
                        <div className="flex items-start gap-4 w-full">
                          <div className="h-14 w-14">
                            <img
                              src="/images/Avatar.png"
                              className="w-full object-cover rounded-full  "
                            />
                          </div>

                          <div className="w-full grow">
                            <div className="flex gap-1 items-center flex-row justify-between w-full">
                              <p className="text-lg text-[#5B5B5B] font-semibold">
                                Demi Wikinson{' '}
                                <span className="font-thin text-graay-400 text-xs">
                                  2 mins ago
                                </span>
                              </p>
                            </div>
                            <div className="flex gap-1 flex-row justify-between items-center w-full">
                              <p className="text-sm  text-[#5B2D0B] font-normal">
                                <span className="font-thin text-[#5B5B5B] text-xs">
                                  Deposited
                                </span>{' '}
                                10kg 0f PET Bottles
                              </p>
                            </div>
                            <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                              <div className="p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center">
                                <img src="/images/Icon.png" alt="" />
                              </div>
                              <div className="flex gap-1 flex-col items-start w-full">
                                <p className="text-base  text-[#344054] font-normal">
                                  {' '}
                                  10kg 0f PET Bottles
                                </p>
                                <p className="text-sm  text-[#667085] font-normal">
                                  720KB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
                        <div className="flex items-start gap-4 w-full">
                          <div className="h-14 w-14">
                            <img
                              src="/images/Avatar.png"
                              className="w-full object-cover rounded-full  "
                            />
                          </div>

                          <div className="w-full grow">
                            <div className="flex gap-1 items-center flex-row justify-between w-full">
                              <p className="text-lg text-[#5B5B5B] font-semibold">
                                Demi Wikinson{' '}
                                <span className="font-thin text-graay-400 text-xs">
                                  2 mins ago
                                </span>
                              </p>
                            </div>
                            <div className="flex gap-1 flex-row justify-between items-center w-full">
                              <p className="text-sm  text-[#5B2D0B] font-normal">
                                <span className="font-thin text-[#5B5B5B] text-xs">
                                  Deposited
                                </span>{' '}
                                10kg 0f PET Bottles
                              </p>
                            </div>
                            <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                              <div className="p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center">
                                <img src="/images/Icon.png" alt="" />
                              </div>
                              <div className="flex gap-1 flex-col items-start w-full">
                                <p className="text-base  text-[#344054] font-normal">
                                  {' '}
                                  10kg 0f PET Bottles
                                </p>
                                <p className="text-sm  text-[#667085] font-normal">
                                  720KB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mx-auto w-full flex items-center justify-center mt-6">
                      <Link href={`/company/offers/${request.id}/dropoffs`}>
                        <a className="px-4 py-2 border border-gray-300 bg-white text-gray-600 rounded-md">
                          View all Dropoffs
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={`modal__box ${createDispute ? 'show' : ''}`}>
          <div className="modal__box-wrapper shadow-lg rounded-2xl">
            <div className="flex items-start justify-between mb-6">
              <div className="grow">
                <h1 className="text-2xl font-semibold mb-3">Dispute</h1>

                <ul className="list-disc px-4">
                  <li className="text-sm text-gray-500">
                    Reasons for dispute would be both visible to both parties.{' '}
                  </li>
                  <li className="text-sm text-gray-500">
                    Baseless disputes would result to banning of account
                  </li>
                </ul>
              </div>

              <button
                className=" flex items-center rounded-full border-2 border-gray-700  "
                onClick={() => setCreateDispute(false)}
              >
                <span className="pointer-events-none flex items-center p-2">
                  <svg
                    className="h-5 w-5 "
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
            <form>
              <div>
                <div className="mb-3">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Reasons for Dispute (Compulsory)
                    </label>
                  </div>
                  <div className=" relative grow mb-4 w-full">
                    <input className="w-full bg-white h-12 focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Description
                    </label>
                  </div>
                  <div className=" relative grow mb-4 w-full h-full">
                    <textarea
                      className="w-full bg-white focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                      placeholder="Kindly provide as much information as possible"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="">
                    <label className="text-gray-700 font-medium">
                      Upload Proof (Compulsory)
                    </label>
                    <p className="text-sm text-gray-500">
                      Upload pictures, screenshots less than 3mb
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
              </div>

              <div className="flex items-center justify-center gap-4 mt-5 mx-auto">
                <button
                  className="px-9 py-2 border border-gray-300 bg-white text-gray-700 rounded-full"
                  type="button"
                  onClick={handleDispute}
                >
                  Cancel
                </button>
                <button
                  className="px-9 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full "
                  type="button"
                  onClick={submitDispute}
                >
                  Send dispute
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className={`modal__box ${requestSuccessModal ? 'show' : ''}`}>
          <div className="modal__box-wrapper shadow-lg rounded-2xl">
            <div className="flex items-start justify-between mb-6">
              <div className="grow">
                <h1 className="text-2xl font-semibold mb-3">
                  Dispute has been sent
                </h1>

                <ul className="list-disc px-4">
                  <li className="text-sm text-gray-500">
                    The Individual would not be able to get his pay unless
                    dispute is resolved.
                  </li>
                </ul>
              </div>

              <button
                className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  "
                onClick={() => setRequestSuccessModal(false)}
              >
                <span className="pointer-events-none flex items-center p-2">
                  <svg
                    className="h-5 w-5 "
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

            <div className="flex items-center justify-center gap-4 mt-5 mx-auto">
              <button
                className="px-9 py-2 border border-gray-300 bg-white text-gray-700 rounded-full"
                type="button"
              >
                Cancel
              </button>
              <Link href="/company/offers">
                <a className="px-9 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full ">
                  Back to Offers
                </a>
              </Link>
            </div>
          </div>
        </div>
      </CompanyLayout>
    </>
  );
};

SingleOffer.getInitialProps = ({ query }) => {
  return { id: query.id };
};

export default SingleOffer;
