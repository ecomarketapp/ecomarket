import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ExpandMoreVertical from '../../components/Icons/ExpandMoreVertical';
import UserLayout from '../../components/UserLayout/Layout';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useRouter } from 'next/router';

import {
  findProfile,
  getRequestsByLocation,
  getPage,
  getCompanyRequests,
  dateConv,
} from '../../utils/utils';
import Waiting from '../../components/Waiting';
import Head from 'next/head';

const Dashboard = () => {
  const [user, setUser] = useState();
  const [contract, setContract] = useState();
  const [balance, setBalance] = useState(0);
  const [requests, setRequests] = useState();

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
    const profile = await findProfile(address, 'collectors');

    if (!profile.status) {
      router.push(`/${getPage()}/profile`);
    } else {
      if (profile.data.name == undefined) {
        router.push(`/${getPage()}/profile`);
      }
      setUser(profile.data);
    }
  };

  const setEscrowContract = async () => {
    const trc20ContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; //contract address

    try {
      let contract = await window.tronWeb.contract().at(trc20ContractAddress);

      setContract(contract);
    } catch (error) {
      console.error('trigger smart contract error', error);
    }
  };

  const getWalletBalance = async () => {
    if (contract) {
      const balance = await contract.balances(address).call();

      setBalance(parseInt(balance) / 1e6);
    }
  };

  const getRequests = async () => {
    if (user.location) {
      console.log(user.location, 'locate');
      const requests = await getRequestsByLocation(user?.location?._id);

      setRequests(requests.data);
    }
  };

  useEffect(() => {
    if (address) {
      getUser(address);
    }

    setEscrowContract();
  }, [address]);

  useEffect(() => {
    getWalletBalance();
  }, [contract]);

  useEffect(() => {
    if (user) {
      getRequests();
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Ecomarket | Collector Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ecomarket Collector Dashboard" />
      </Head>
      {connected ? (
        <>
          <UserLayout>
            <section>
              <div className="container mx-auto px-6">
                <div className="h-full pb-24 px-4 md:px-12 py-12">
                  <div className="grow py-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-3 ">
                      Dashboard
                    </h1>
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
                              {parseFloat(balance).toFixed(2)} TRX
                            </h3>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-end w-full">
                          <Link href="/collector/wallet">
                            <a className="text-[#DD7D37] text-base px-6">
                              view wallet
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex my-6 items-stretch w-full space-y-4 md:space-x-4 md:space-y-0 gap-4 flex-col lg:flex-row">
                    <div className="w-full md:w-full lg:w-full flex-col flex-1 md:space-y-4 h-full">
                      <div className=" bg-white mt-3 md:mt-0  py-6 w-full  relative overflow-hidden rounded">
                        <div className="flex items-center justify-between flex-row w-full border-b border-gray-200 pb-4 flex-wrap">
                          <h5 className=" text-2xl text-gray-700">
                            Requests in your location
                          </h5>
                          <span className="flex items-center text-gray-400 bg-white text-sm border-gray-300 border px-5 rounded-full h-12 gap-5 mt-3 md:mt-0">
                            Filter By:
                            <select
                              style={{ background: 'transparent' }}
                              className="focus:outline-none h-full border-none cursor-pointer text-gray-600 w-auto py-2 "
                            >
                              <option value="all">All</option>
                            </select>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-9 gap-y-9 mt-7 relative">
                          {requests &&
                            requests.map((request, index) => (
                              <Link
                                key={index}
                                href={`/collector/requests/${request.id}`}
                              >
                                <a key={index}>
                                  <div className="card shadow-lg py-3 rounded-md">
                                    <div className="">
                                      <div className="w-full h-56">
                                        <img
                                          src="/images/marketimage.png"
                                          className="w-full h-full object-cover rounded-md"
                                        />
                                      </div>
                                    </div>
                                    <div className=" flex items-start justify-between mt-3 px-5 py-4 flex-col w-full gap-2">
                                      <div className="flex items-center justify-between w-full">
                                        <h4 className="font-semibold text-[#3D4044] text-lg">
                                          {request.title}
                                        </h4>
                                        <p>
                                          {request?.scrap_subcategory?.name}
                                        </p>
                                      </div>
                                      <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center justify-start gap-2">
                                          <img
                                            src="/images/location.svg"
                                            className=""
                                          />
                                          <div>
                                            <p className="text-base text-[#6D747D]">
                                              {request.collection_center.title}
                                            </p>
                                          </div>
                                        </div>
                                        <h4 className="">
                                          {request.quantity_required}kg
                                        </h4>
                                      </div>
                                      <div className="flex items-start justify-between w-full gap-2">
                                        <p className="flex-1 text-xs text-[#878A90]">
                                          {request.description.substring(
                                            0,
                                            100
                                          )}
                                          ....
                                        </p>
                                        <div className="flex items-end justify-start flex-col gap-1 flex-1">
                                          <p className="text-xs">
                                            Request expires in:
                                          </p>
                                          <div>
                                            <p className="text-base text-[#3D4044] font-semibold">
                                              {dateConv(
                                                request.request_expires_at
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              </Link>
                            ))}
                        </div>

                        {!requests && (
                          <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hiddens rounded h-full fade-in">
                            <div className="flex items-center justify-center flex-col gap-4">
                              <img src="/images/file-not-found.svg" />
                              <p>No requests avalaible</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </UserLayout>
        </>
      ) : (
        <UserLayout>
          <section>
            <div className="container mx-auto px-6">
              <Waiting />
            </div>
          </section>
        </UserLayout>
      )}
    </>
  );
};

export default Dashboard;
