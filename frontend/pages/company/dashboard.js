import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import CompanyLayout from '../../components/CompanyLayout/Layout';
import ExpandMoreVertical from '../../components/Icons/ExpandMoreVertical';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useRouter } from 'next/router';
import {
  findProfile,
  newProfile,
  getPage,
  getCompanyRequests,
} from '../../utils/utils';
import Waiting from '../../components/Waiting';

const Dashboard = () => {
  const [user, setUser] = useState();
  const [requests, setRequests] = useState();
  const [contract, setContract] = useState();
  const [balance, setBalance] = useState(0);

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

  const getRequests = async () => {
    const requests = await getCompanyRequests(user.id);

    setRequests(requests.data);
  };

  const setEscrowContract = async (address) => {
    const trc20ContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; //contract address

    try {
      let contract = await window.tronWeb.contract().at(trc20ContractAddress);

      setContract(contract);
    } catch (error) {
      console.error('trigger smart contract error', error);
    }
  };

  const getWalletBalance = async () => {
    if(contract && address){
      const balance = await contract.balances(address).call();

      setBalance(parseInt(balance) / 1e6);
    }
  };

  const dateConv = (date) => {
    return (
      new Date(date).toLocaleDateString() +
      ' ' +
      new Date(date).toLocaleTimeString()
    );
  };

  useEffect(() => {
    if (address) {
      getUser(address);
    }

    setEscrowContract();
  }, [address]);

  useEffect(() => {
    if (user) {
      getRequests();
    }
  }, [user]);

  useEffect(() => {
    getWalletBalance();
  }, [contract]);

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
                      <a
                        href="./create-offer"
                        className="px-8 py-3 rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg text-white transition duration-150 ease-in-out border-0"
                      >
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
                              {parseFloat(balance).toFixed(2)} TRX
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
                    <div className=" grid grid-cols-1 py-6 w-full gap-6 relative">
                      <div className=" flex flex-col justify-between">
                        <div className=" flex flex-col  ">
                          {requests ? (
                            <>
                              {requests.map((request, index) => (
                                <div
                                  key={index}
                                  style={{ cursor: 'pointer' }}
                                  className="flex items-center py-4 px-4 text-sm w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out"
                                >
                                  <Link href={`./offers/${request.id}/dropoffs`}>
                                    <div className="flex items-start gap-3 w-full">
                                      <div className="w-full">
                                        <div className="flex gap-1 items-center flex-row justify-between w-full">
                                          <p className="text-lg text-[#5B5B5B] font-semibold">
                                            {request.title}
                                          </p>

                                          <p className="text-xs font-normal">
                                            Expires:{' '}
                                            {dateConv(
                                              request.request_expires_at
                                            )}
                                          </p>
                                        </div>
                                        <div className="flex gap-1 flex-row justify-between items-center w-full">
                                          <p className="text-sm text-[#5B5B5B] font-normal">
                                            {request.amount_per_unit} TRX / kg
                                            of {request.quantity_required}kg
                                            needed.
                                          </p>
                                          <p className="text-sm text-[#12B76A]">
                                            0% Provided
                                          </p>
                                        </div>
                                        <div className="flex gap-1 flex-row justify-between items-end w-full">
                                          <p className="text-sm">
                                            {request?.location?.name}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </>
                          ) : (
                            <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
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
              <div className="h-full pb-24 px-4 md:px-12 py-12">
                <Waiting />
              </div>
            </div>
          </section>
        </CompanyLayout>
      )}
    </>
  );
};

export default Dashboard;
