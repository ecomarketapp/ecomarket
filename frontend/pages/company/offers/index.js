import Link from 'next/link';
import React, { useEffect, useState, Suspense } from 'react';
import CompanyLayout from '../../../components/CompanyLayout/Layout';
import DropdownIcon from '../../../components/Icons/DropdownIcon';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../../loading';
import LoadingState from '../../../components/LoadingState';
import backend from '../../../components/services/backend';
import { dateExpire } from '../../../utils/date';
import { formatLocation } from '../../../utils/other';

const Offers = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');

  const company_id = '642dcf9cda01b4cdf1749f41';

  // const fetchRequests = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://127.0.0.1:8080/api/companies/${id}/requests`
  //     );
  //     return res.json();
  //     // setRequests(res.data.data)
  //     // console.log(res)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const resetParams = () => {
    setStatus('');
    setPage(1);
  };
  const list = () => {
    const params = {};
    // if (status) params.status = status;
    // if (page && page > 1) params.page = page;
    // if (id) params.id = id;

    // useEffect(() => {
    backend
      .listRequestsByCompany(company_id)
      .then((requests) => setRequests(requests.data))
      .catch((e) => {
        console.log(e);
      });

    console.log(requests);
    // }, []);

    // backend
    //   .listInvoices(params)
    //   .then((invoices) => {
    //     setInvoices(invoices);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  useEffect(list, [company_id]);

  // const { data, status } = useQuery('requests', fetchRequests);

  if (status === 'loading') {
    return <div>loading</div>;
  }

  if (status === 'error') {
    return <div>Error</div>;
  }


  return (
    <>
      <CompanyLayout>
        <Suspense fallback={<LoadingState />}>
          <section>
            <div className="container mx-auto px-6">
              <div className="h-full pb-24 px-4 md:px-12 py-12">
                <div className="flex items-center py-4 mb-6 flex-col lg:flex-row">
                  <div className="flex-1 w-full">
                    <h3 className="h2">Offers</h3>
                  </div>

                  <div className="mt-1 relative rounded-full flex-1  items-center grow flex h-12 w-full ">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none h-full">
                      <span className="text-gray-500 px-3">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 20 20"
                          className="mr-3 pr-2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                            stroke="#9998A9"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M17.5 17.5L13.875 13.875"
                            stroke="#9998A9"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="border border-gray-300 py-2 px-4  block w-full pl-12 pr-12 sm:text-sm rounded-full h-full focus:outline-none focus:border-gray-400"
                      placeholder="Search for offers"
                    />
                  </div>
                </div>

                <div className="w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full mx-auto  ">
                  {/* <div className="absolute h-full border border-[#E4E7EC] inset-0 z-0 mx-auto w-[0.5px] hidden md:block"></div> */}
                  <div className=" grid grid-cols-1 py-6 w-full gap-6 relative">
                    <div className=" flex flex-col justify-between">
                      <div className=" flex flex-col  ">
                        {requests && requests.length > 0 ? (
                          requests.map((request, index) => {
                            return (
                              <>
                                <div
                                  className="flex items-center py-4 px-4  text-sm w-full border-b  border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out"
                                  key={index}
                                >
                                  <div className="flex items-start gap-3 w-full">
                                    <div className="w-full">
                                      <div className="flex gap-1 items-center flex-row justify-between w-full">
                                        <p className="text-lg text-[#5B5B5B] font-semibold">
                                          {request.title}
                                        </p>

                                        <p className="text-xs font-normal">
                                          Expires: {request.request_expires_at ? dateExpire(request.request_expires_at) : 'Not entered'}
                                        </p>
                                      </div>
                                      <div className="flex gap-1 flex-row justify-between items-center w-full">
                                        <p className="text-sm text-[#5B5B5B] font-normal">
                                          $500
                                        </p>
                                        <p className="text-sm text-[#12B76A]">
                                          25% Provided
                                        </p>
                                      </div>
                                      <div className="flex gap-1 flex-row justify-between items-start w-full mt-1">
                                        {/* <p className="text-sm"> {request.location?.name} {request.location?.state}</p> */}
                                        <p className="text-sm"> {formatLocation((request.location?.name), (request.location?.state) )}</p>
                                        <Link href={`/company/offers/${request.id}`}>
                                          <a className="text-white text-xs px-4 py-2 bg-[#DD7D37] rounded-md hover:bg-[#DD7D37]/90">
                                            view offer
                                          </a>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })
                        ) : (
                          <>
                            <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
                              <div className="flex items-center justify-center flex-col gap-4">
                                <img src="/images/file-not-found.svg" />
                                <p>No requests avalaible</p>
                              </div>
                            </div>
                          </>
                        )}

                        <div className="flex items-center py-4 px-4 text-sm w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
                          <div className="flex items-start gap-3 w-full">
                            <div className="w-full">
                              <div className="flex gap-1 items-center flex-row justify-between w-full">
                                <p className="text-lg text-[#5B5B5B] font-semibold">
                                  120kg of PET Bottles
                                </p>

                                <p className="text-xs font-normal">
                                  Expires: 20/10/22
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-center w-full">
                                <p className="text-sm text-[#5B5B5B] font-normal">
                                  $500
                                </p>
                                <p className="text-sm text-[#12B76A]">
                                  25% Provided
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-end w-full">
                                <p className="text-sm">Ikeja, Lagos</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center py-4 px-4 text-sm w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
                          <div className="flex items-start gap-3 w-full">
                            <div className="w-full">
                              <div className="flex gap-1 items-center flex-row justify-between w-full">
                                <p className="text-lg text-[#5B5B5B] font-semibold">
                                  120kg of PET Bottles
                                </p>

                                <p className="text-xs font-normal">
                                  Expires: 20/10/22
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-center w-full">
                                <p className="text-sm text-[#5B5B5B] font-normal">
                                  $500
                                </p>
                                <p className="text-sm text-[#12B76A]">
                                  25% Provided
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-end w-full">
                                <p className="text-sm">Ikeja, Lagos</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center py-4 px-4 text-sm w-full border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
                          <div className="flex items-start gap-3 w-full">
                            <div className="w-full">
                              <div className="flex gap-1 items-center flex-row justify-between w-full">
                                <p className="text-lg text-[#5B5B5B] font-semibold">
                                  120kg of PET Bottles
                                </p>

                                <p className="text-xs font-normal">
                                  Expires: 20/10/22
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-center w-full">
                                <p className="text-sm text-[#5B5B5B] font-normal">
                                  $500
                                </p>
                                <p className="text-sm text-[#12B76A]">
                                  25% Provided
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-end w-full">
                                <p className="text-sm">Ikeja, Lagos</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Suspense>
      </CompanyLayout>
    </>
  );
};

export default Offers;
