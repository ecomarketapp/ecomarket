import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ExpandMoreVertical from '../../components/Icons/ExpandMoreVertical';
import UpwardIcon from '../../components/Icons/UpwardIcon';
import UserLayout from '../../components/UserLayout/Layout';
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
      const profile = await findProfile(address, "collectors");

      if (!profile.status) {
        router.push(`/${getPage()}/profile`);
      } else {
        if (profile.data.name == undefined) {
          router.push(`/${getPage()}/profile`);
        }
        setUser(profile.data);
      }
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
    if (contract) {
      const balance = await contract.balances(address).call();

      setBalance(parseInt(balance) / 1e6);
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

  return (
    <>
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

                        <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hiddens rounded h-full fade-in">
                          <div className="flex items-center justify-center flex-col gap-4">
                            <img src="/images/file-not-found.svg" />
                            <p>No requests avalaible</p>
                          </div>
                        </div>
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
