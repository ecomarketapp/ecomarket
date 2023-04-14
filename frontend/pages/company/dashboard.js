import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import CompanyLayout from '../../components/CompanyLayout/Layout';
import ExpandMoreVertical from '../../components/Icons/ExpandMoreVertical';
import UpwardIcon from '../../components/Icons/UpwardIcon';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useRouter } from 'next/router';
import { findProfile, newProfile, getPage } from '../../utils/utils';
import Waiting from '../../components/Waiting';

const Dashboard = () => {
  // const [offer, setOffer] = useState({
  //   title: '',
  //   description: '',
  //   quantity_required: '',
  //   amount_per_unit: '',
  //   request_expires_at: '',
  //   company: '',
  //   location: '',
  //   escrow_payment: '',
  //   deliveries: '',
  // });

  // const handleChange = (e) => {
  //   setInputs((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  // };

  const [user, setUser] = useState();

  const {
    wallet,
    address,
    connected,
    select,
    connect,
    disconnect,
    signMessage,
    signTransaction,
  } = useWallet();

  const router = useRouter();

  const getUser = async () => {
    const profile = await findProfile(address);

    if (!profile.status) {
      router.push(`/${getPage()}/profile`);
    } else {
      if (profile.data.name == undefined) {
        router.push(`/${getPage()}/profile`);
      }
      setUser(profile.data);
    }
  };

  useEffect(() => {
    if (address) {
      getUser(address);
    }
  }, [address]);

  return (
    <>
      {connected ? (
        <CompanyLayout>
          <section>
            <div className="container mx-auto px-6">
              {user ? (
                <div className="h-full pb-24 px-4 md:px-12 py-12">
                  <div className="grow py-4 flex items-center justify-between mb-3 ">
                    <h1 className="text-3xl font-bold text-gray-800 ">
                      Dashboard
                    </h1>
                    <div>
                      <a  href="./create-offer" className="px-8 py-3 rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg text-white transition duration-150 ease-in-out border-0">
                        Create Offer
                      </a>
                    </div>
                  </div>

                  <div className="w-full mb-6 py-6 h-full">
                    <div className="grid  full-width">
                      <div className="shadow w-full bg-white relative py-6 rounded flex flex-col justify-between">
                        <div className="px-6">
                          <div className="flex items-center justify-between flex-row w-full">
                            <h5 className="text-gray-600">Wallet Balance</h5>
                            <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                              <ExpandMoreVertical />
                            </button>
                          </div>
                          <div className="py-4">
                            <h3 className="text-neutral800 text-4xl	">
                              2,000.00 TRX
                            </h3>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-end w-full">
                          <Link href="/company/wallet">
                            <a className="text-[#DD7D37] text-base px-6">
                              view wallet
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full mx-auto  ">
                    {/* <div className="absolute h-full border border-[#E4E7EC] inset-0 z-0 mx-auto w-[0.5px] hidden md:block"></div> */}
                    <div className=" grid grid-cols-1 py-6 w-full gap-6 relative">
                      <div className=" flex flex-col justify-between">
                        <div className=" flex flex-col  ">
                          <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
                            <div className="flex items-center justify-center flex-col gap-4">
                              <img src="/images/file-not-found.svg" />
                              <p>No requests avalaible</p>
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
                                    500 TRX
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
                          {/* Next */}
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
                                    500 TRX
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
              ) : (
                <Waiting />
              )}
            </div>
          </section>
        </CompanyLayout>
      ) : (
        <CompanyLayout>
          <section>
            <div className="container mx-auto px-6">
              <div className="h-full pb-24 px-4 md:px-12 py-12"></div>
            </div>
          </section>
        </CompanyLayout>
      )}
    </>
  );
};

export default Dashboard;
