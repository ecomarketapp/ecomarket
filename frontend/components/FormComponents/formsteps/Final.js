import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DropdownIcon from '../../Icons/DropdownIcon';
import LoadingState from '../../LoadingState';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import Waiting from '../../Waiting';
import { finalizeDelivery } from '../../../utils/utils';

const Final = ({ data, quantity, delivery }) => {
  const [collectClaim, setCollectClaim] = useState(false);
  const [confirmTransfer, setConfirmTransfer] = useState();
  const [successTransfer, setSuccessTransfer] = useState();
  const [moneyClaimed, setMoneyClaimed] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [contract, setContract] = useState();
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

  const router = useRouter();

  const setEscrowContract = async () => {
    const trc20ContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; //contract address

    try {
      let contract = await window.tronWeb.contract().at(trc20ContractAddress);

      setContract(contract);
    } catch (error) {
      console.error('trigger smart contract error', error);
    }
  };

  useEffect(() => {
    window.tronLink.request({ method: 'tron_requestAccounts' });
  }, []);

  useEffect(() => {
    setEscrowContract();
  }, []);

  const handleconfirmTransfer = () => {
    setConfirmTransfer(!confirmTransfer);
  };

  const handleSuccessTransfer = async () => {
    const amount =
      delivery.delivery_amount * delivery.request.amount_per_unit * 1e6;
    const signature = delivery.approver_signature;
    const nonce = 10;
    const companyHex = window.tronWeb.address
      .toHex(delivery.approver_wallet_address)
      .replace('41', '0x');

    // console.log(delivery);
    // console.log(amount);
    // console.log(signature);
    // console.log(companyHex);
    // return;

    if (contract) {
      try {
        const tx = await contract
          .redeemPaymentFromEscrow(amount, nonce, companyHex, signature)
          .send();

        setWaiting(true);

        console.log(tx);
        console.log(delivery);

        await finalizeDelivery(
          delivery?.id || delivery?._id,
          address,
          delivery?.request?._id
        );

        setTimeout(() => {
          setWaiting(false);
          window.location.assign('/collector/wallet');
        }, 5000);
      } catch (error) {
        console.log('Claim up error: ', error);
      }
    }

    //0x26ddb52630f376f534632859f687bec5dd9bdd0aa600f02cc91715ef8392dbb2 === 0x26ddb52630f376f534632859f687bec5dd9bdd0aa600f02cc91715ef8392dbb2
    //0x39b90f90ffedf90bfebfc4307687b9841a1bd0ebb8e57edaead907d8dba42e49536dedfc928f5c5494be27a5b7dff306e211e354551d4fa7680e9e4916dc17351b

    // setConfirmTransfer(false);
    // setSuccessTransfer(!successTransfer);

    // const moneyClaimInterval = setInterval(() => {
    //   setMoneyClaimed(true);
    // }, 1000);

    // return () => clearInterval(moneyClaimInterval);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCollectClaim(true);
    }, 8000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  });

  console.log(delivery);
  return (
    <>
      {/* Fourth Step */}
      <div>
        <div className="flex flex-col gap-3 px-4 py-4"></div>

        <div className="px-6 py-6  border border-gray-300 rounded-lg">
          <div>
            {isLoading ? (
              <div className="flex items-center justify-center mt-7 ">
                <LoadingState />
              </div>
            ) : (
              <>
                <div className="dropdown relative grow mb-4 w-full border-b pb-8 border-gray-300">
                  <button
                    className="w-full bg-gray-100 h-12 focus:outline-none active:outline-none  flex items-center justify-between border-0 border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                    type="button"
                  >
                    <span className="pointer-events-none flex items-center gap-2 text-[#6B7280]">
                      Show Request Details
                    </span>
                    <span className="pointer-events-none ">
                      <DropdownIcon />
                    </span>
                  </button>
                </div>

                <div className="py-4">
                  <div className="my-4 pb-3">
                    <h3 className="text-2xl">Your Delivery Details</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 gap-y-9 py-3">
                    <div className="flex-1">
                      <span className="text-gray-700 font-base mb-3">
                        Category of Scrap
                      </span>
                      <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                        {data?.scrap_category.name}
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-700 font-base mb-3">
                        Type of Scrap
                      </span>
                      <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                        {data?.scrap_subcategory?.name}
                      </div>
                    </div>

                    <div className="flex-1">
                      <span className="text-gray-700 font-base mb-3">
                        Delivery Size
                      </span>
                      <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center gap-3 text-sm">
                        {quantity} kg
                      </div>
                      <small className="text-xs font-thin"></small>
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
                        Images
                      </span>
                      <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100  border border-[#D1D5DB] border-dashed focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                            {/* <div className="p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center border-4 border-[#FEF8F3]">
                              <img src="/images/Icon.png" alt="" />
                            </div>
                            <div className="flex gap-1 flex-col items-start w-full">
                              <p className="text-base  text-[#344054] font-normal">
                                Pictures of the PET bottles.png
                              </p>
                              <p className="text-sm  text-[#667085] font-normal">
                                720KB
                              </p>
                            </div> */}
                            <img src={delivery.delivery_proof} />
                          </div>

                          {/* <div>
                            <button className="text-[#DD7D37] text-base">
                              download
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm py-3 mt-6 max-w-md mx-auto px-4">
                  <div>
                    <p className="text-[#6D747D] font-medium">
                      Cool down Period:
                      {collectClaim === false ? (
                        <span className="text-xl font-semibold">
                          {' '}
                          48hrs : 59mins : 32secs
                        </span>
                      ) : (
                        <span className="text-xl font-semibold">
                          {' '}
                          00hrs : 00mins : 00secs
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-[#A4A5A8] font-thin py-3">
                    <p>
                      You can only claim your rewards for this delivery after
                      the cool-off period has elapssed.{' '}
                    </p>
                    <p className="mt-5">
                      What is a cool-off period?{' '}
                      <a href="" className="text-[#DD7D37]">
                        Learn More
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center flex-col gap-4 mt-4 mx-auto w-full">
                  {moneyClaimed ? (
                    <h3 className="font-semibold text-2xl py-6">
                      Money has been claimed
                    </h3>
                  ) : (
                    <>
                      {delivery.delivery_amount > 0 ? (
                        <button
                          className={`px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-full md:w-1/2 ${
                            collectClaim === false ? 'disabled' : ''
                          }`}
                          onClick={handleconfirmTransfer}
                        >
                          Claim {delivery.delivery_amount} TRX
                        </button>
                      ) : (
                        <small className="text-xs font-thin mt-2 text-[#6D747D]">
                          Reload this page to view and claim your payment
                        </small>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Transfer Confirmation Modal */}
      <div className={`modal__box ${confirmTransfer ? 'show' : ''}`}>
        <div className="modal__box-wrapper shadow-lg rounded-2xl">
          <div className=" mb-6">
            <div className="grow mb-3">
              <h1 className="text-2xl font-semibold ">Claim your money</h1>
            </div>

            {waiting && <Waiting />}

            {!waiting && (
              <>
                <div>
                  <h3 className="mb-3">
                    {delivery.delivery_amount} TRX would be transferred to your
                    wallet
                  </h3>
                  <small className="text-xs font-thin  text-[#6D747D]">
                    EcoMarket would collect{' '}
                    <span className="text-gray-700 font-bold">0% </span>
                  </small>
                  <h3 className="my-3">Wallet Address: {address}</h3>
                </div>

                <button
                  className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  "
                  onClick={() => setConfirmTransfer(false)}
                >
                  <span className="pointer-events-none flex items-center p-1">
                    <svg
                      className="h-3 w-3"
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
              </>
            )}
          </div>

          {!waiting && (
            <div className="flex items-center justify-center gap-4 mt-7 mx-auto w-full">
              <button
                className="px-9 py-3 border border-gray-300 bg-white text-gray-700 rounded-full w-1/2"
                type="button"
                onClick={() => setConfirmTransfer(false)}
              >
                Cancel
              </button>
              <button
                className="px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-1/2"
                onClick={handleSuccessTransfer}
              >
                Transfer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Transfer Success Modal */}
      <div className={`modal__box ${successTransfer ? 'show' : ''}`}>
        <div className="modal__box-wrapper shadow-lg rounded-2xl">
          <div className=" mb-6">
            <div className="grow mb-3">
              <h1 className="text-2xl font-semibold ">Transfer Initiated</h1>
            </div>

            <div>
              <p className="mb-3">
                Kindly note the following before starting this request
              </p>

              <Link href="">
                <a className="mb-3 underline text-sm font-thin  text-[#6D747D]">
                  View transaction on etherscan
                </a>
              </Link>
            </div>

            <button
              className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  "
              onClick={() => setSuccessTransfer(false)}
            >
              <span className="pointer-events-none flex items-center p-1">
                <svg
                  className="h-3 w-3 "
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

          <div className="flex items-center justify-center gap-4 mt-7 mx-auto w-full">
            {/* <Link href="/individual/transactions">
                            <a className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-1/2'>View transactions</a>
                        </Link> */}
            <Link href="/collector/wallet">
              <a
                className="px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-1/2"
                //   onClick={() => router.push('/collector/wallet')}
              >
                View wallet
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Final;
