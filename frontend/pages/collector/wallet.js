import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Tabs } from 'react-tabs';
import Tab from 'react-tabs/lib/components/Tab';
import TabList from 'react-tabs/lib/components/TabList';
import TabPanel from 'react-tabs/lib/components/TabPanel';
import ExpandMoreVertical from '../../components/Icons/ExpandMoreVertical';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import Waiting from '../../components/Waiting';
import UserLayout from '../../components/UserLayout/Layout';
import Head from 'next/head';

const wallet = () => {
  const [contract, setContract] = useState();
  const [balance, setBalance] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [waiting, setWaiting] = useState(false);

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
      console.log(contract, address);

      const balance = await contract.balances(address).call();

      setBalance(parseInt(balance) / 1e6);
    }
  };

  const topUp = async () => {
    if (contract) {
      try {
        const tx = await contract.addToEscrow().send({
          callValue: parseInt(topUpAmount) * 1e6,
        });

        setShowTopUp(false);

        setWaiting(true);

        setTimeout(() => {
          setWaiting(false);
          setBalance(balance + withdrawAmount);
          // window.location.reload();
        }, 2000);
      } catch (error) {
        console.log('Top up error: ', error);
      }
    }
  };

  const withdraw = async () => {
    if (contract) {
      try {
        const tx = await contract
          .removeFromEscrow(parseInt(withdrawAmount) * 1e6)
          .send();

        setShowWithdraw(false);
        setWaiting(true);

        setTimeout(() => {
          setWaiting(false);
          setBalance(balance - withdrawAmount);
          // window.location.reload();
        }, 2000);
      } catch (error) {
        console.log('Top up error: ', error);
      }
    }
  };

  useEffect(() => {
    if (window !== undefined && window.tronWeb && window.tronWeb.ready) {
      window.tronLink.request({ method: 'tron_requestAccounts' });
    }
  }, []);

  useEffect(() => {
    setEscrowContract();
  }, []);

  useEffect(() => {
    if (address) {
      getWalletBalance();
    }
  }, [contract]);

  return (
    <>
      <Head>
        <title>Ecomarket | Collector Wallet</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ecomarket Collector Wallet" />
      </Head>
      <UserLayout>
        {contract && (
          <section className="eco__orders">
            <div className="container mx-auto px-6">
              <div className="h-full pb-24 px-4 md:px-12 py-12">
                <div className="grow py-4">
                  <h1 className="text-3xl font-bold text-gray-800 mb-3 ">
                    Wallet
                  </h1>
                </div>

                {waiting && <Waiting />}
                {!waiting && (
                  <div className="mb-12">
                    <div className="grid grids-cols-1  gap-5">
                      <div className="shadow w-full bg-white relative py-4 rounded border border-[#E4E7EC] flex flex-col justify-between">
                        <div className="px-6">
                          <div className="flex items-center justify-between flex-row w-full">
                            <h5 className="text-gray-600">
                              Wallet Escrow Balance
                            </h5>
                            <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                              <ExpandMoreVertical />
                            </button>
                          </div>
                          <div className="py-4">
                            <h3 className="text-neutral800 text-4xl	">
                              {parseFloat(balance).toFixed(4)} TRX
                            </h3>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-100 flex items-center gap-2 justify-end px-6  w-full">
                          {/* <button
                          className="text-white text-base px-4 py-2 bg-[#DD7D37] rounded-md"
                          onClick={() => {
                            setShowTopUp(true);
                          }}
                        >
                          Lock
                        </button> */}
                          <button
                            onClick={() => {
                              setShowWithdraw(true);
                            }}
                            className="text-[#DD7D37] text-base  px-4 py-2 bg-whhite border border-[#DD7D37] rounded-md"
                          >
                            Claim Funds
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {showTopUp && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      topUp();
                    }}
                  >
                    <div className="mb-12">
                      <div className="grid grids-cols-1  gap-5">
                        <div className="shadow w-full bg-white relative py-4 rounded border border-[#E4E7EC] flex flex-col justify-between">
                          <div className="px-6">
                            <div className="flex items-center justify-between flex-row w-full">
                              <h5 className="text-gray-600">
                                Lock funds in escrow to fufill collectors
                                delivery
                              </h5>
                            </div>
                            <div className="py-4">
                              <input
                                id="amount"
                                type="number"
                                placeholder="Enter amount of TRX to lock"
                                onChange={(e) => {
                                  setTopUpAmount(e.target.value);
                                }}
                                className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none"
                                required
                              />
                            </div>
                          </div>
                          <div className="pt-4 border-t border-gray-100 flex items-center gap-2 justify-end px-6  w-full">
                            <button
                              type="submit"
                              className="text-white text-base px-4 py-2 bg-[#DD7D37] rounded-md"
                            >
                              Lock
                            </button>
                            <button
                              onClick={() => {
                                setShowTopUp(false);
                              }}
                              className="text-[#DD7D37] text-base  px-4 py-2 bg-whhite border border-[#DD7D37] rounded-md"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {showWithdraw && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      withdraw();
                    }}
                  >
                    <div className="mb-12">
                      <div className="grid grids-cols-1  gap-5">
                        <div className="shadow w-full bg-white relative py-4 rounded border border-[#E4E7EC] flex flex-col justify-between">
                          <div className="px-6">
                            <div className="flex items-center justify-between flex-row w-full">
                              <h5 className="text-gray-600">
                                Claim your earnings from escrow wallet
                              </h5>
                            </div>
                            <div className="py-4">
                              <input
                                id="amount"
                                type="number"
                                placeholder="Enter amount of TRX to lock"
                                onChange={(e) => {
                                  setWithdrawAmount(e.target.value);
                                }}
                                className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none"
                                required
                              />
                            </div>
                          </div>
                          <div className="pt-4 border-t border-gray-100 flex items-center gap-2 justify-end px-6  w-full">
                            <button
                              type="submit"
                              className="text-white text-base px-4 py-2 bg-[#DD7D37] rounded-md"
                            >
                              Unlock
                            </button>
                            <button
                              onClick={() => {
                                setShowWithdraw(false);
                              }}
                              className="text-[#DD7D37] text-base  px-4 py-2 bg-whhite border border-[#DD7D37] rounded-md"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}
      </UserLayout>
    </>
  );
};

export default wallet;
